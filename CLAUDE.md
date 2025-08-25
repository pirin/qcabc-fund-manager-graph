# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **The Graph Protocol** subgraph for indexing blockchain events from the qcabc-fund-manager smart contracts on Base Sepolia. The subgraph provides GraphQL APIs to query fund management activities including deposits, redemptions, investments, and shareholder data.

## Essential Development Commands

```bash
# Generate TypeScript types from ABIs and schema (run after schema/ABI changes)
yarn codegen

# Build the subgraph
yarn build

# Run unit tests using Matchstick framework
yarn test

# Deploy to The Graph Studio (requires authentication)
yarn deploy

# Local development
yarn create-local    # Create local subgraph
yarn deploy-local    # Deploy to local graph node
yarn remove-local    # Remove local subgraph
```

## Architecture & Code Organization

**Core Components:**
- `schema.graphql` - Defines GraphQL entities and their relationships
- `subgraph.yaml` - Main configuration mapping events to handlers
- `networks.json` - Contract addresses and start blocks per network
- `abis/` - Smart contract ABIs (FundManager.json, ShareToken.json)
- `src/` - Event handler mappings written in AssemblyScript
- `tests/` - Matchstick unit tests with utilities
- `generated/` - Auto-generated TypeScript types (don't edit manually)

**Smart Contracts Being Indexed:**
- **FundManager** (`0x4595312F55b82B7AEa83ff8DD45d86C655732839`) - Fund operations, deposits, redemptions
- **ShareToken** (`0x354f8A8e721A11908e8f19eE1156f3C5fDd9c012`) - ERC-20 token events

## Development Workflow

1. **Schema Changes**: Update `schema.graphql` to define new entities or modify existing ones
2. **Code Generation**: Run `yarn codegen` to generate TypeScript types from schema and ABIs
3. **Event Handlers**: Implement mapping functions in `src/` to handle blockchain events
4. **Configuration**: Update `subgraph.yaml` to map new events to handler functions
5. **Testing**: Write unit tests in `tests/` using Matchstick framework
6. **Build & Deploy**: Run `yarn build` then `yarn deploy`

## Key Patterns

**Entity ID Strategy:**
- Use `event.transaction.hash.concatI32(event.logIndex.toI32())` for transaction-scoped entities
- Use natural IDs (like addresses) for long-lived entities like Shareholders

**Event Handler Structure:**
```typescript
export function handleEventName(event: EventNameEvent): void {
  // Create or load entity
  let entity = new EntityType(generateId(event));
  
  // Set properties from event
  entity.property = event.params.value;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  
  // Save entity
  entity.save();
}
```

**Shareholder Relationship Management:**
- Maintain running share balances per user address
- Link deposits/redemptions to shareholder entities
- Update last activity timestamps

## Local Development Setup

```bash
# Start local graph node
docker-compose up

# In another terminal
yarn create-local
yarn deploy-local
```

## Network Configuration

Currently deployed on **Base Sepolia**. Contract addresses and start blocks are configured in `networks.json`. Update this file when adding new networks or contract addresses.

## Testing

Uses **Matchstick** framework for unit testing. Test files are in `tests/` with corresponding utility files. Tests mock blockchain events and verify entity creation/updates.