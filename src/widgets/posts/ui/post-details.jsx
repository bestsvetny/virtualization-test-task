import { Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostQuery } from '/src/entities/posts';

export const PostDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetPostQuery(params.postId);
    return (
        <>
            {isLoading && <div>loading...</div>}
            {data && (
                <Flex flexDirection='column' gap='10px'>
                    <Text fontSize='2xl' as='h1'>
                        {data.title}
                    </Text>
                    <Text fontSize='md' as='h1'>
                        {data.body}
                    </Text>
                    <Button alignSelf='start' onClick={() => navigate(-1)}>
                        Назад
                    </Button>
                </Flex>
            )}
        </>
    );
};
