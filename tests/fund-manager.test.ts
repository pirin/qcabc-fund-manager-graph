import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddressRemovedFromWhitelist } from "../generated/schema"
import { AddressRemovedFromWhitelist as AddressRemovedFromWhitelistEvent } from "../generated/FundManager/FundManager"
import { handleAddressRemovedFromWhitelist } from "../src/fund-manager"
import { createAddressRemovedFromWhitelistEvent } from "./fund-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let addr = Address.fromString("0x0000000000000000000000000000000000000001")
    let newAddressRemovedFromWhitelistEvent =
      createAddressRemovedFromWhitelistEvent(addr)
    handleAddressRemovedFromWhitelist(newAddressRemovedFromWhitelistEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddressRemovedFromWhitelist created and stored", () => {
    assert.entityCount("AddressRemovedFromWhitelist", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddressRemovedFromWhitelist",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "addr",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
