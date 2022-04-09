import { createClient } from 'urql'

const client = createClient({
  url: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai',
})

type Period = {
  start: bigint, // inclusive
  end: bigint, // exclusive
  sum: bigint
}

function isOverlaps(currentPeriod: Period, startedAtTimestamp: bigint, stoppedAtTimestamp: bigint) {
  console.log("startedAtTimestamp", startedAtTimestamp);
  console.log("stoppedAtTimestamp", stoppedAtTimestamp);
  if (stoppedAtTimestamp === null) {
    return startedAtTimestamp < currentPeriod.end;
  }

  return stoppedAtTimestamp >= currentPeriod.start && startedAtTimestamp < currentPeriod.end;
}

function min(left: bigint, right: bigint) {
  return left < right ? left : right;
}

function max(left: bigint, right: bigint) {
  return left > right ? left : right;
}

export const getOutgoingFlowByPeriod = async (sender: string, step: number, start: number, end = Date.now()) => {
  const streamPeriods = `
    {
      streamPeriods(
        where: {sender: "${sender.toLowerCase()}"}
        orderBy: startedAtTimestamp
      ) {
        token {
          id
        }
        flowRate
        startedAtTimestamp
        stoppedAtTimestamp
      }
    }`

  const result = await client.query(streamPeriods).toPromise()

  let periods: Period[] = [];
  for (let i = start; i < end; i += step) {
    const currentPeriod = {
      start: BigInt(i),
      end: BigInt(i + step),
      sum: BigInt(0)
    };

    for (let j = 0; j < result.data.streamPeriods.length; j++) {
      const sp = result.data.streamPeriods[j];

      if (isOverlaps(currentPeriod, sp.startedAtTimestamp, sp.stoppedAtTimestamp)) {
        const activeSeconds = min(currentPeriod.end, sp.stoppedAtTimestamp) - max(currentPeriod.start, sp.startedAtTimestamp);
        currentPeriod.sum += sp.flowRate * BigInt(activeSeconds);
      }

      if (sp.startedAtTimestamp > currentPeriod.end) {
        break;
      }
    }

    periods.push(currentPeriod);
  }

  console.log("Periods: ", periods);
}