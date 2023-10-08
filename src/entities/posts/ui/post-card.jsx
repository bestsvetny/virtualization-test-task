import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const PostCard = React.memo(function PostCard({ post }) {
    return (
        <Flex padding='10px'>
            <Flex maxWidth='800px' paddingRight='10px'>
                <Text whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                    {post.id}. <b>{post.title}</b>: {post.body}
                </Text>
            </Flex>

            <Link to={`/posts/${post.id}`}>
                <Button>Просмотр</Button>
            </Link>
        </Flex>
    );
});
