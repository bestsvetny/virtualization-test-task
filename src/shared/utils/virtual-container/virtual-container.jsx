import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { PostCard } from '/src/entities/posts/index.js';
import PropTypes from 'prop-types';

/*
 * Контейнер отрисовывает видимую область списка и размещает 2 observables для отслеживания смещения видимой области вверх и вниз
 * При смещении расчитывается область списка которую нужно отрисовать
 * Расчет производится исходя из количества элементов, переданного itemHeight и boundingClientRect
 * */

export const VirtualContainer = ({ list, itemHeight }) => {
    const [topId, setTopId] = useState(0);
    const [botId, setBotId] = useState(Math.floor(window.innerHeight * 1.7) / itemHeight);

    const listHeight = list.length * itemHeight;

    const topObs = useRef(null);
    const botObs = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const offset = Math.max(
                5,
                Math.floor((Math.abs(entries[0].boundingClientRect.y) - window.innerHeight) / itemHeight)
            );
            if (entries[0].isIntersecting) {
                setTopId((prevState) => prevState + offset);
                setBotId((prevState) => prevState + offset);
            }
        });

        const observable = botObs.current;

        if (observable) {
            observer.observe(observable);
        }

        return () => {
            if (observable) {
                observer.unobserve(observable);
            }
        };
    }, [botId, itemHeight, list, topId]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && topId > 0) {
                const offset = Math.max(
                    5,
                    Math.floor(Math.abs(entries[0].boundingClientRect.y + topId * itemHeight) / itemHeight)
                );
                setTopId((prevState) => Math.max(prevState - offset, 0));
                setBotId((prevState) => Math.max(prevState - offset, 0));
            }
        });

        const observable = topObs.current;

        if (observable) {
            observer.observe(observable);
        }

        return () => {
            if (observable) {
                observer.unobserve(observable);
            }
        };
    }, [botId, itemHeight, list, topId]);

    return (
        <Flex flexDirection='column' alignItems='center' height={`${listHeight}px`}>
            <Box ref={topObs} id='topObs' height={`${topId * itemHeight}px`} position='absolute'></Box>
            <Flex flexDirection='column' alignItems='center' transform={`translateY(${topId * itemHeight}px)`}>
                {list.map((post, index) => {
                    if (index <= botId && index >= topId) {
                        return (
                            <Box key={post.id}>
                                <PostCard post={post} />
                            </Box>
                        );
                    }
                })}
            </Flex>
            <Box
                ref={botObs}
                id='botObs'
                position='absolute'
                transform={`translateY(${botId * itemHeight}px)`}
                height={`${listHeight - botId * itemHeight}px`}
            ></Box>
        </Flex>
    );
};

VirtualContainer.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string,
            title: PropTypes.string,
            body: PropTypes.string
        })
    ),
    itemHeight: PropTypes.number
};
