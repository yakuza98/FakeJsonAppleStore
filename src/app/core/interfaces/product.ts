export interface IProducts {
  id: number,
  title: string,
  price: number,
  year: number,
  image?: string,
  configuration: IProductsConfig
  quantity: number
}

export interface IProductsConfig {
    chip: string,
    SSD: string,
    memory: string,
    display: string
}
