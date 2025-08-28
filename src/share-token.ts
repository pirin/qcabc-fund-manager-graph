import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval as ApprovalEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent,
} from "../generated/ShareToken/ShareToken"
import {
  Approval,
  ShareTokenOwnershipTransfer,
  Pause,
  Transfer,
  Unpause,
  Shareholder,
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new ShareTokenOwnershipTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Pause(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  // Update sender balance (if not zero address - minting case)
  if (event.params.from.notEqual(Address.zero())) {
    let sender = Shareholder.load(event.params.from);
    if (sender) {
      let newBalance = sender.shares.minus(event.params.value);
      // Ensure balance doesn't go negative (safety check)
      if (newBalance.lt(BigInt.fromI32(0))) {
        newBalance = BigInt.fromI32(0);
      }
      sender.shares = newBalance;
      sender.lastUpdated = event.block.timestamp;
      sender.save();
    }
  }
  
  // Update receiver balance (if not zero address - burning case)
  if (event.params.to.notEqual(Address.zero())) {
    let receiver = Shareholder.load(event.params.to);
    if (!receiver) {
      // Create new shareholder entity for first-time token receivers
      receiver = new Shareholder(event.params.to);
      receiver.account = event.params.to;
      receiver.shares = BigInt.fromI32(0);
      receiver.lastUpdated = event.block.timestamp;
    }
    receiver.shares = receiver.shares.plus(event.params.value);
    receiver.lastUpdated = event.block.timestamp;
    receiver.save();
  }

  // Log the transfer event
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpause(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
