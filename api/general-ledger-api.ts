import { fetchApi } from '@/utils/http'
import { ChartOfAccount, GeneralLedgerType } from '@/utils/type'

export async function getAllCoa() {
  return fetchApi<ChartOfAccount[]>({
    url: 'api/chart-of-accounts/get-all-coa',
    method: 'GET',
  })
}

export async function getGeneralLedgerByDate({
  accountcode,
  fromdate,
  todate
}: {
  accountcode: number
  fromdate: string
  todate: string
}) {
  return fetchApi<GeneralLedgerType[]>({
    url: `api/ledgerreport/general-ledger/?fromdate=${fromdate}&todate=${todate}&accountcode=${accountcode}`,
    method: 'GET',
  })
}

