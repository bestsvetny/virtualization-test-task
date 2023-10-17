import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/*
 * Контейнер рендерит видимую область списка и размещает 2 observables для отслеживания смещения видимой области вверх и вниз
 * При смещении рассчитывается область списка которую нужно отрендерить
 * Расчет производится исходя из количества элементов, переданного itemHeight и boundingClientRect
 * */

export const VirtualContainer = ({ list, renderItem, itemHeight }) => {
    const [topId, setTopId] = useState(0);
    const [botId, setBotId] = useState(Math.floor(window.innerHeight * 1.7) / itemHeight);

    const listHeight = list.length * itemHeight;

    const topObs = useRef(null);
    const botObs = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                switch (entry.target.id) {
                    case 'botObs': {
                        if (entry.isIntersecting) {
                            const offset = Math.max(
                                5,
                                Math.floor((Math.abs(entry.boundingClientRect.y) - window.innerHeight) / itemHeight)
                            );
                            setTopId((prevState) => prevState + offset);
                            setBotId((prevState) => prevState + offset);
                        }
                        break;
                    }
                    case 'topObs': {
                        if (entry.isIntersecting && topId > 0) {
                            const offset = Math.max(
                                5,
                                Math.floor(Math.abs(entry.boundingClientRect.y + topId * itemHeight) / itemHeight)
                            );
                            setTopId((prevState) => Math.max(prevState - offset, 0));
                            setBotId((prevState) => Math.max(prevState - offset, 0));
                        }
                        break;
                    }
                    default:
                        console.error('No handler for this observable');
                }
            });
        });

        const botCurr = botObs.current;
        const topCurr = topObs.current;

        if (botCurr && topCurr) {
            observer.observe(botCurr);
            observer.observe(topCurr);
        }

        return () => {
            if (botCurr && topCurr) {
                observer.unobserve(botCurr);
                observer.unobserve(topCurr);
            }
        };
    }, [itemHeight, topId]);

    return (
        <Flex flexDirection='column' alignItems='center' height={`${listHeight}px`}>
            <Box ref={topObs} id='topObs' height={`${topId * itemHeight}px`} position='absolute'></Box>
            <Flex flexDirection='column' alignItems='center' transform={`translateY(${topId * itemHeight}px)`}>
                {list.map((props, index) => {
                    if (index <= botId && index >= topId) {
                        return <>{renderItem(props)}</>;
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
    list: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    itemHeight: PropTypes.number.isRequired
};
