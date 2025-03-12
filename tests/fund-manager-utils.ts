import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddressRemovedFromWhitelist,
  AddressWhitelisted,
  Deposited,
  Invested,
  OwnershipTransferred,
  PortfolioUpdated,
  Redeemed,
  RedemptionsPaused,
  RedemptionsResumed
} from "../generated/FundManager/FundManager"

export function createAddressRemovedFromWhitelistEvent(
  addr: Address
): AddressRemovedFromWhitelist {
  let addressRemovedFromWhitelistEvent =
    changetype<AddressRemovedFromWhitelist>(newMockEvent())

  addressRemovedFromWhitelistEvent.parameters = new Array()

  addressRemovedFromWhitelistEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )

  return addressRemovedFromWhitelistEvent
}

export function createAddressWhitelistedEvent(
  addr: Address
): AddressWhitelisted {
  let addressWhitelistedEvent = changetype<AddressWhitelisted>(newMockEvent())

  addressWhitelistedEvent.parameters = new Array()

  addressWhitelistedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )

  return addressWhitelistedEvent
}

export function createDepositedEvent(
  user: Address,
  depositAmount: BigInt,
  shareTokensMinted: BigInt
): Deposited {
  let depositedEvent = changetype<Deposited>(newMockEvent())

  depositedEvent.parameters = new Array()

  depositedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam(
      "depositAmount",
      ethereum.Value.fromUnsignedBigInt(depositAmount)
    )
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam(
      "shareTokensMinted",
      ethereum.Value.fromUnsignedBigInt(shareTokensMinted)
    )
  )

  return depositedEvent
}

export function createInvestedEvent(to: Address, amount: BigInt): Invested {
  let investedEvent = changetype<Invested>(newMockEvent())

  investedEvent.parameters = new Array()

  investedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  investedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return investedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPortfolioUpdatedEvent(
  newPortfolioValue: BigInt,
  newSharePrice: BigInt,
  timestamp: BigInt
): PortfolioUpdated {
  let portfolioUpdatedEvent = changetype<PortfolioUpdated>(newMockEvent())

  portfolioUpdatedEvent.parameters = new Array()

  portfolioUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPortfolioValue",
      ethereum.Value.fromUnsignedBigInt(newPortfolioValue)
    )
  )
  portfolioUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newSharePrice",
      ethereum.Value.fromUnsignedBigInt(newSharePrice)
    )
  )
  portfolioUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return portfolioUpdatedEvent
}

export function createRedeemedEvent(
  user: Address,
  shareTokensRedeemed: BigInt,
  depositAmount: BigInt
): Redeemed {
  let redeemedEvent = changetype<Redeemed>(newMockEvent())

  redeemedEvent.parameters = new Array()

  redeemedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  redeemedEvent.parameters.push(
    new ethereum.EventParam(
      "shareTokensRedeemed",
      ethereum.Value.fromUnsignedBigInt(shareTokensRedeemed)
    )
  )
  redeemedEvent.parameters.push(
    new ethereum.EventParam(
      "depositAmount",
      ethereum.Value.fromUnsignedBigInt(depositAmount)
    )
  )

  return redeemedEvent
}

export function createRedemptionsPausedEvent(): RedemptionsPaused {
  let redemptionsPausedEvent = changetype<RedemptionsPaused>(newMockEvent())

  redemptionsPausedEvent.parameters = new Array()

  return redemptionsPausedEvent
}

export function createRedemptionsResumedEvent(): RedemptionsResumed {
  let redemptionsResumedEvent = changetype<RedemptionsResumed>(newMockEvent())

  redemptionsResumedEvent.parameters = new Array()

  return redemptionsResumedEvent
}
