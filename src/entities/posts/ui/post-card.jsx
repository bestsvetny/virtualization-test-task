import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PostCardComp({ post }) {
    const navigate = useNavigate();

    return (
        <Flex padding='10px'>
            <Flex width='750px' paddingRight='10px'>
                <Text whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                    {post.id}. <b>{post.title}</b>: {post.body}
                </Text>
            </Flex>

            <Button onClick={() => navigate(`/posts/${post.id}`)}>Просмотр</Button>
        </Flex>
    );
}
PostCardComp.propTypes = {
    post: PropTypes.exact({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired
    }).isRequired
};
export const PostCard = React.memo(PostCardComp);
