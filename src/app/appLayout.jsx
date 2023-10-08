import { Flex, Text } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

export const AppLayout = () => {
    return (
        <Flex flexDirection='column' alignItems='center' height='100vh' paddingX='15px'>
            <Flex justifyContent='center' paddingY='15px'>
                <Link to={'/'}>
                    <Text fontSize='xl'>Posts</Text>
                </Link>
            </Flex>
            <Outlet />
        </Flex>
    );
};
