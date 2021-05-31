import { Category } from '@commerce/types'
import { getConfig, ShopifyConfig } from '../api'
import getCategories from '../utils/get-categories'
import getVendors, { Brands } from '../utils/get-vendors'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: Brands
  }
> = T

const getSiteInfo = async (options?: {
  variables?: any
  config: ShopifyConfig
  preview?: boolean
}): Promise<GetSiteInfoResult> => {
  let { config } = options ?? {}

  config = getConfig(config)

  const categoriesPromise = getCategories(config)
  const brandsPromise = getVendors(config)
  const categories = await categoriesPromise
  const brands = await brandsPromise

  return {
    categories,
    brands,
  }
}

export default getSiteInfo
