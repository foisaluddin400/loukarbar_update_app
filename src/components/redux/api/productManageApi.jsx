import { baseApi } from "./baseApi";

const category = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategroy: builder.query({
      query: ({limit}) => {
        return {
          url: `/category/all-categories?limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getCategroyAll: builder.query({
      query: ({searchTerm,page,limit}) => {
        return {
          url: `/category/all-categories?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getCategroyAllSelect: builder.query({
      query: ({page,limit}) => {
        return {
          url: `/category/all-categories?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


    getProductAll: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/product/all-products?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category/create-category",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    
    addGeneratePresignedUrl: builder.mutation({
      query: (data) => {
        return {
          url: "/generate-presigned-url",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addSubCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/sub-category/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/delete-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/sub-category/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateCategory: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
updateSubCategory: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/sub-category/update/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    getSubCategory: builder.query({
      query: ({searchTerm,page,limit}) => {
        return {
          url: `/sub-category/all-subcategories?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    deleteShopProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/shop/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getSingleShopProduct: builder.query({
      query: ({ id }) => {
        return {
          url: `/shop/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["newHost"],
    }),

    addShopProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/shop/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateShopProduct: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/shop/update/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

getAllCreator: builder.query({
      query: ({ isApproved, searchTerm, page, limit } = {}) => {
        const queryParams = new URLSearchParams();
        if (isApproved !== undefined) {
          queryParams.append("isApproved", isApproved);
        }
        if (searchTerm) {
          queryParams.append("searchTerm", searchTerm);
        }
        if (page) {
          queryParams.append("page", page);
        }
        if (limit) {
          queryParams.append("limit", limit);
        }
        return {
          url: `/creator/get-all-creators${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    // getSubCategory: builder.query({
    //   query: ({id}) => {
    //     return {
    //       url: `/categories/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    // deleteProduct: builder.mutation({
    //   query: (data) => ({
    //     url: `/admin/products`,
    //     method: "DELETE",
    //     body: {id:data},
    //   }),
    //   invalidatesTags: ["updateProfile"],
    // }),

    approveCreator: builder.mutation({
      query: ({data,id}) => {
        return {
          url: `/creator/approve-reject/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    blockUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/block-unblock/${id}`,
          method: "PATCH",
        
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addAlbum: builder.mutation({
      query: (data) => {
        return {
          url: "/album/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

     getAllAlbum: builder.query({
       query: ({searchTerm,page,limit}) => {
         return {
           url: `/album/all-albums?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
           method: "GET",
         };
       },
       providesTags: ["updateProfile"],
     }),
     getAllPodcast: builder.query({
       query: () => {
         return {
           url: `/podcast/all`,
           method: "GET",
         };
       },
       providesTags: ["updateProfile"],
     }),

     getSingleAlbum: builder.query({
       query: ({ id }) => {
         return {
           url: `/album/get-single/${id}`,
           method: "GET",
         };
       },
       providesTags: ["updateProfile"],
     }),

      getSinglePodcast: builder.query({
       query: ({ id }) => {
         return {
           url: `/podcast/get-single/${id}`,
           method: "GET",
         };
       },
       providesTags: ["updateProfile"],
     }),

     updateAlbum: builder.mutation({
       query: ({ formData, id }) => {
         return {
           url: `/album/update/${id}`,
           method: "PATCH",
           body: formData,
         };
       },
       invalidatesTags: ["updateProfile"],
     }),



    getStation: builder.query({
       query: () => {
         return {
           url: `/station/get-station`,
           method: "GET",
         };
       },
       providesTags: ["updateProfile"],
     }),


     updateStation: builder.mutation({
       query: ( data) => {
         return {
           url: `/station/update`,
           method: "PATCH",
           body: data,
         };
       },
       invalidatesTags: ["updateProfile"],
     }),


    //  caneleHostRequest: builder.mutation({
    //    query: ({ carId, status }) => {
    //      return {
    //        url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
    //        method: "PATCH",
    //      };
    //    },
    //    invalidatesTags: ["host"],
    //  }),

    // approveHostRequest: builder.mutation({
    //   query: ({ carId, status }) => {
    //     return {
    //       url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
    //       method: "PATCH",
    //     };

    //   },
    // }),
  }),
});

export const {
  useGetCategroyQuery,
  useGetProductAllQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetSubCategoryQuery,
  useGetSingleShopProductQuery,
  useAddShopProductMutation,
  useUpdateShopProductMutation,
  useDeleteShopProductMutation,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useGetAllCreatorQuery,
  useApproveCreatorMutation,
  useBlockUserMutation,
  useGetAllAlbumQuery,
  useUpdateAlbumMutation,
  useGetSingleAlbumQuery,
  useGetSinglePodcastQuery,
  useAddAlbumMutation,
  useGetAllPodcastQuery,
  useGetCategroyAllQuery,
  useGetCategroyAllSelectQuery,
  useAddGeneratePresignedUrlMutation,
  useGetStationQuery,
  useUpdateStationMutation
} = category;













