import {
  ApprovalForAll as ApprovalForAllEvent,
  TokenMinted as TokenMintedEvent,
  TokenValidityChanged as TokenValidityChangedEvent,
} from "../generated/MembershipBadge/MembershipBadge"
import {
  ApprovalForAll,
  TokenMinted,
  TokenValidityChanged,
} from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenMinted(event: TokenMintedEvent): void {
  let entity = new TokenMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenValidityChanged(
  event: TokenValidityChangedEvent,
): void {
  let entity = new TokenValidityChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenOwner = event.params.tokenOwner
  entity.tokenId = event.params.tokenId
  entity.isValid = event.params.isValid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
