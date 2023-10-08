import { baseApi } from '/src/shared/api/index.js';

const postsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPostsList: build.query({
            query: (offset = 0) => ({
                url: `/posts`,
                params: {
                    _limit: 20,
                    _start: offset
                }
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, endpointState }) {
                const dataLength = endpointState?.data.length || 0;
                return currentArg >= dataLength;
            }
        }),
        getPost: build.query({
            query: (postId = 1) => ({
                url: `/posts/${postId}`
            })
        })
    })
});

export const { useGetPostsListQuery, useGetPostQuery } = postsApi;
