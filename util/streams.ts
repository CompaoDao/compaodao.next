import { createClient } from 'urql'
import divide from 'divide-bigint'

const client = createClient({
  url: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai',
})

export type PeriodFlow = {
  start: Date,
  sum: number,
  currency: string,
}

export const getHourlyOutflow = async (account: string) => {
  let date = new Date();
  date.setHours(date.getHours() - 11, 0, 0, 0);

  const periods: PeriodFlow[] = [];
  while (date <= new Date()) {
    let periodEndDate = new Date(date);
    periodEndDate.setHours(date.getHours() + 1);

    periods.push({
      start: new Date(date),
      sum: await getSumForPeriod(account, date, periodEndDate, true),
      currency: 'DAIx'
    });

    date.setHours(date.getHours() + 1);
  }

  return periods;
}

export const getHourlyInflow = async (account: string) => {
  let date = new Date();
  date.setHours(date.getHours() - 11, 0, 0, 0);

  const periods: PeriodFlow[] = [];
  while (date <= new Date()) {
    let periodEndDate = new Date(date);
    periodEndDate.setHours(date.getHours() + 1);

    periods.push({
      start: new Date(date),
      sum: await getSumForPeriod(account, date, periodEndDate, false),
      currency: 'DAIx'
    });

    date.setHours(date.getHours() + 1);
  }

  return periods;
}

export const getSumForPeriod = async (account: string, start: Date, end: Date, outgoing: boolean): Promise<number> => {
  const startInSeconds = Math.floor(start.getTime() / 1000);
  const endInSeconds = Math.floor(end.getTime() / 1000);

  const endedStreamPeriods = `
    {
      streamPeriods(
        where: {
          ${outgoing ? "sender" : "receiver"}: "${account.toLowerCase()}", 
          startedAtTimestamp_lte: ${endInSeconds}
          stoppedAtTimestamp_gt: ${startInSeconds}
          token: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"
        }
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

  let result = await client.query(endedStreamPeriods).toPromise();
  const sumForEndedPeriods = result.data.streamPeriods
    .map(sp => {
      const activeSeconds = Math.min(endInSeconds, Number(sp.stoppedAtTimestamp)) - Math.max(startInSeconds, Number(sp.startedAtTimestamp));
      return BigInt(sp.flowRate) * BigInt(activeSeconds);
    })
    .reduce((prevValue: bigint, currentValue: bigint) => prevValue + currentValue, BigInt(0));

  const unfinishedStreamPeriods = `
    {
      streamPeriods(
        where: {
          ${outgoing ? "sender" : "receiver"}: "${account.toLowerCase()}", 
          startedAtTimestamp_lte: ${endInSeconds}
          stoppedAtTimestamp: null
          token: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"
        }
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

  result = await client.query(unfinishedStreamPeriods).toPromise();
  const sumForUnfinishedPeriods = result.data.streamPeriods
    .map(sp => {
      const activeSeconds = endInSeconds - Math.max(startInSeconds, Number(sp.startedAtTimestamp));
      return BigInt(sp.flowRate) * BigInt(activeSeconds);
    })
    .reduce((prevValue: bigint, currentValue: bigint) => prevValue + currentValue, BigInt(0));

  return divide(sumForEndedPeriods + sumForUnfinishedPeriods, 10 ** 18).toFixed(6);
}