import { Stack } from "@fluentui/react";
import { animated, useSpring } from "@react-spring/web";

import styles from "./Answer.module.css";
import { AnswerIcon } from "./AnswerIcon";

export const AnswerLoading = () => {
    const animatedStyles = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    return (
        <animated.div style={{ ...animatedStyles }}>
            <Stack className={styles.answerContainer} verticalAlign="space-between">
                <AnswerIcon />
                <Stack.Item grow>
                    <p className={styles.answerText}>
                        回答を生成中
                        <span className={styles.loadingdots} />
                    </p>
                </Stack.Item>
            </Stack>
        </animated.div>
    );
};
