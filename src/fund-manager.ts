import {
  AddressRemovedFromWhitelist as AddressRemovedFromWhitelistEvent,
  AddressWhitelisted as AddressWhitelistedEvent,
  Deposited as DepositedEvent,
  Invested as InvestedEvent,
  ManagementFeeCollected as ManagementFeeCollectedEvent,
  ManagementFeeRecipientUpdated as ManagementFeeRecipientUpdatedEvent,
  ManagementFeeUpdated as ManagementFeeUpdatedEvent,
  MembershipBadgeUpdated as MembershipBadgeUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PortfolioUpdated as PortfolioUpdatedEvent,
  Redeemed as RedeemedEvent,
  RedemptionsPaused as RedemptionsPausedEvent,
  RedemptionsResumed as RedemptionsResumedEvent
} from "../generated/FundManager/FundManager"
import {
  AddressRemovedFromWhitelist,
  AddressWhitelisted,
  Deposited,
  Invested,
  ManagementFeeCollected,
  ManagementFeeRecipientUpdated,
  ManagementFeeUpdated,
  MembershipBadgeUpdated,
  OwnershipTransferred,
  PortfolioUpdated,
  Redeemed,
  RedemptionsPaused,
  RedemptionsResumed
} from "../generated/schema"

export function handleAddressRemovedFromWhitelist(
  event: AddressRemovedFromWhitelistEvent
): void {
  let entity = new AddressRemovedFromWhitelist(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAddressWhitelisted(event: AddressWhitelistedEvent): void {
  let entity = new AddressWhitelisted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposited(event: DepositedEvent): void {
  let entity = new Deposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.depositAmount = event.params.depositAmount
  entity.shareTokensMinted = event.params.shareTokensMinted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInvested(event: InvestedEvent): void {
  let entity = new Invested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManagementFeeCollected(
  event: ManagementFeeCollectedEvent
): void {
  let entity = new ManagementFeeCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.depositor = event.params.depositor
  entity.feeAmount = event.params.feeAmount
  entity.depositAmount = event.params.depositAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManagementFeeRecipientUpdated(
  event: ManagementFeeRecipientUpdatedEvent
): void {
  let entity = new ManagementFeeRecipientUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newRecipient = event.params.newRecipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManagementFeeUpdated(
  event: ManagementFeeUpdatedEvent
): void {
  let entity = new ManagementFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFee = event.params.newFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMembershipBadgeUpdated(
  event: MembershipBadgeUpdatedEvent
): void {
  let entity = new MembershipBadgeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newMembershipBadge = event.params.newMembershipBadge

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePortfolioUpdated(event: PortfolioUpdatedEvent): void {
  let entity = new PortfolioUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newPortfolioValue = event.params.newPortfolioValue
  entity.newSharePrice = event.params.newSharePrice
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRedeemed(event: RedeemedEvent): void {
  let entity = new Redeemed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.shareTokensRedeemed = event.params.shareTokensRedeemed
  entity.depositAmount = event.params.depositAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRedemptionsPaused(event: RedemptionsPausedEvent): void {
  let entity = new RedemptionsPaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRedemptionsResumed(event: RedemptionsResumedEvent): void {
  let entity = new RedemptionsResumed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
