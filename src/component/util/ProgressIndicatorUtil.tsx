import React, {ReactNode, useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';

export type ProgressIndicatorUtilItemType = {component?: ReactNode, title: string}

interface ProgressIndicatorUtilProps {
    items?: ProgressIndicatorUtilItemType[];
    currentItemIndex?: number;
}

export const ProgressIndicatorUtil = ({ items, currentItemIndex=0 }: ProgressIndicatorUtilProps) => {
    const [item, setItem] = useState<ProgressIndicatorUtilItemType | null>(null)

    useEffect(() => {
        if (items && items.length > 0) {
            setItem(items[currentItemIndex]);
        }
    }, [currentItemIndex]);


    return (
        <>
            <View style={styles.container}>
                {(items ?? []).map((_, index) => (
                    <React.Fragment key={index}>
                        {/* Circle */}
                        <View
                            style={[
                                styles.circle,
                                index + 1 <= (currentItemIndex + 1) ? styles.activeCircle : styles.inactiveCircle,
                            ]}
                        >
                            <View
                                style={[
                                    styles.innerCircle,
                                    index + 1 <= (currentItemIndex + 1) ? styles.activeInnerCircle : styles.inactiveInnerCircle,
                                ]}
                            />
                        </View>

                        {/* Line between circles (except after the last circle) */}
                        {index < (items?.length ?? 0) - 1 && (
                            <View
                                style={[
                                    styles.line,
                                    index + 1 < (currentItemIndex + 1.5) ? styles.activeLine : styles.inactiveLine,
                                ]}
                            />
                        )}
                    </React.Fragment>
                ))}
            </View>
            {
                item?.component && item.component
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    activeCircle: {
        // borderColor: 'rgba(109, 134, 234, 1)', // Light blue border for active
        borderColor: 'rgba(53, 63, 181, 1)', // Light blue border for active
    },
    inactiveCircle: {
        // borderColor: 'rgba(234, 236, 240, 1)', // Light gray border for inactive
        borderColor: 'rgba(234, 236, 240, 1)', // Light gray border for inactive
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    activeInnerCircle: {
        // backgroundColor: 'rgba(109, 134, 234, 1)',
        backgroundColor: 'rgba(53, 63, 181, 1)',
    },
    inactiveInnerCircle: {
        backgroundColor: 'rgba(234, 236, 240, 1)',
    },
    line: {
        height: 2,
        width: 60,
    },
    activeLine: {
        backgroundColor: '#6C7CFF', // Light blue for active line
    },
    inactiveLine: {
        backgroundColor: '#E0E0E0', // Light gray for inactive line
    },
});

