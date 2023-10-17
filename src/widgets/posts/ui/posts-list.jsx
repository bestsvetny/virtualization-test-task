import { Box, Flex } from '@chakra-ui/react';
import { PostCard, useGetPostsListQuery } from '/src/entities/posts';
import { useEffect, useRef, useState } from 'react';
import { VirtualContainer } from '/src/shared/utils/virtual-container.jsx';

export const PostsList = () => {
    const [offset, setOffset] = useState(0);
    const { data, isFetching, isLoading } = useGetPostsListQuery(offset);

    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching && offset < 80) {
                    setOffset((prevState) => prevState + 20);
                }
            },
            { threshold: 1 }
        );

        const observable = observerTarget.current;

        if (observable) {
            observer.observe(observable);
        }

        return () => {
            if (observable) {
                observer.unobserve(observable);
            }
        };
    }, [observerTarget, isFetching, offset]);

    return (
        <Flex flexDirection='column' alignItems='center'>
            {isLoading ? (
                'loading...'
            ) : (
                <VirtualContainer list={data} renderItem={(post) => <PostCard post={post} />} itemHeight={60} />
            )}
            {isFetching && !isLoading && 'fetching...'}
            <Box ref={observerTarget}></Box>
        </Flex>
    );
};
