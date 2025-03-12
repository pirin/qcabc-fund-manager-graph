import { BigInt } from "@graphprotocol/graph-ts";
import {
  AddressRemovedFromWhitelist as AddressRemovedFromWhitelistEvent,
  AddressWhitelisted as AddressWhitelistedEvent,
  Deposited as DepositedEvent,
  Invested as InvestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PortfolioUpdated as PortfolioUpdatedEvent,
  Redeemed as RedeemedEvent,
  RedemptionsPaused as RedemptionsPausedEvent,
  RedemptionsResumed as RedemptionsResumedEvent,
} from "../generated/FundManager/FundManager";
import {
  WhitelistAddressRemoval,
  WhitelistAddressAddition,
  Deposit,
  Investment,
  OwnershipTransfer,
  PortfolioUpdate,
  Redemption,
  RedemptionsPause,
  RedemptionsResume,
  Shareholder,
} from "../generated/schema";

export function handleAddressRemovedFromWhitelist(
  event: AddressRemovedFromWhitelistEvent
): void {
  let entity = new WhitelistAddressRemoval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.addr = event.params.addr;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAddressWhitelisted(event: AddressWhitelistedEvent): void {
  let entity = new WhitelistAddressAddition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.addr = event.params.addr;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDeposited(event: DepositedEvent): void {
  let shareholderId = event.params.user;

  //Lookup or create the Shareholder
  let shareholder = Shareholder.load(shareholderId);
  if (!shareholder) {
    shareholder = new Shareholder(shareholderId);
    shareholder.shares = BigInt.fromI32(0);
  }

  //Update the Shareholder
  shareholder.shares = shareholder.shares.plus(event.params.shareTokensMinted);
  shareholder.account = event.params.user;
  shareholder.lastUpdated = event.block.timestamp;
  shareholder.save();

  //Create the Deposit record
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.depositAmount = event.params.depositAmount;
  entity.shareTokensMinted = event.params.shareTokensMinted;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.shareholder = shareholderId;

  entity.save();
}

export function handleInvested(event: InvestedEvent): void {
  let entity = new Investment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.to = event.params.to;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePortfolioUpdated(event: PortfolioUpdatedEvent): void {
  let entity = new PortfolioUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newPortfolioValue = event.params.newPortfolioValue;
  entity.newSharePrice = event.params.newSharePrice;
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRedeemed(event: RedeemedEvent): void {
  let shareholderId = event.params.user;

  //Lookup or create the Shareholder
  let shareholder = Shareholder.load(shareholderId);
  if (!shareholder) {
    shareholder = new Shareholder(shareholderId);
    shareholder.shares = BigInt.fromI32(0);
  }

  //Update the Shareholder
  shareholder.shares = shareholder.shares.minus(
    event.params.shareTokensRedeemed
  );
  shareholder.account = event.params.user;
  shareholder.lastUpdated = event.block.timestamp;
  shareholder.save();

  //Create the Redeem record
  let entity = new Redemption(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.shareTokensRedeemed = event.params.shareTokensRedeemed;
  entity.depositAmount = event.params.depositAmount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.shareholder = shareholderId;

  entity.save();
}

export function handleRedemptionsPaused(event: RedemptionsPausedEvent): void {
  let entity = new RedemptionsPause(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRedemptionsResumed(event: RedemptionsResumedEvent): void {
  let entity = new RedemptionsResume(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
