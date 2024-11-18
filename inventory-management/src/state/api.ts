import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import build from "next/dist/build"

export interface Product {
   productId:     String      
   name    :      String
   price   :      number
   rating ? :     number
   stockQuantity : number
 }

 export interface User {
  userId:string;
  name:string;
  email: string;
}

export interface NewProduct {    
   name    :      String
   price   :      number
   rating ? :     number
   stockQuantity : number
 }

export interface SalesSummary{
   salesSummaryId :  String 
  totalValue      : number
  changePercentage : number
  date             : string
}

export interface PurchageSummary {
   purchaseSummaryId : String
  totalPurchased    : number
  changePercentage? : number
  date             : string
}

export interface ExpenseSummary {
  expenseSummaryId : String
  totalExpenses    : number
  date             : string
}

export interface ExpenseByCategorySummary { 
   expenseByCategoryId   : String
   category           : String
   amount             : string
   date               : string
}



interface  DashboardMetrics {
   popularProducts: Product[];
   salesSummary: SalesSummary[];
   purchageSummary: PurchageSummary[];
   expenseSummary: ExpenseSummary[];
   expenseByCategorySummary: ExpenseByCategorySummary[];

}

 export const api = createApi({
    baseQuery : fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath:"api",
    tagTypes: ["DashboardMetrics","Products","Users","Expenses"],
    endpoints: (build) => ({
      getDashboardMetrics : build.query<DashboardMetrics, void>({
         query: () => "/dashboard",
         providesTags : ["DashboardMetrics"]

      }),
      getProducts: build.query<Product[], string | void>({
         query: (search) => ({
           url: "/products",
           params: search ? { search } : {},
         }),
         providesTags: ["Products"],
       }),

       createProduct: build.mutation<Product, NewProduct>({
         query: (newProduct) => ({
           url: "/products",
           method: "POST",
           body: newProduct,
         }),
         invalidatesTags: ["Products"],
       }),

      getUsers: build.query<User[], void>({
        query: () => "/users",
        providesTags: ["Users"],
      }),

      getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
        query: () => "/expenses",
        providesTags: ["Expenses"],
      }),

      
    }),
    
 });

 export const {
   useGetDashboardMetricsQuery
   ,useGetProductsQuery
   ,useCreateProductMutation,
   useGetUsersQuery,
   useGetExpensesByCategoryQuery
 } = api;