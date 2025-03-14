import { useMemo } from "react";
import { Stack, IconButton } from "@fluentui/react";
import DOMPurify from "dompurify";

import styles from "./Answer.module.css";

import { ChatCompletionResponse } from "../../api";
import { parseAnswerToHtml } from "./AnswerParser";
import { AnswerIcon } from "./AnswerIcon";
import { SpeechOutput } from "./SpeechOutput";

interface Props {
    answer: ChatCompletionResponse;
    isSelected?: boolean;
    isStreaming: boolean;
    onThoughtProcessClicked: () => void;
    onSupportingContentClicked: () => void;
}

export const Answer = ({ answer, isSelected, isStreaming, onThoughtProcessClicked, onSupportingContentClicked }: Props) => {
    const messageContent = answer.message.content;
    const parsedAnswer = useMemo(() => parseAnswerToHtml(messageContent, isStreaming), [answer]);

    const sanitizedAnswerHtml = DOMPurify.sanitize(parsedAnswer.answerHtml);

    return (
        <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} verticalAlign="space-between">
            <Stack.Item>
                <Stack horizontal horizontalAlign="space-between">
                    <AnswerIcon />
                    <div>
                        <IconButton
                            style={{ color: "black" }}
                            iconProps={{ iconName: "Lightbulb" }}
                            title="思考過程を表示"
                            ariaLabel="思考過程を表示"
                            onClick={() => onThoughtProcessClicked()}
                            disabled={!answer.context.thoughts?.length}
                        />
                        <IconButton
                            style={{ color: "black" }}
                            iconProps={{ iconName: "ClipboardList" }}
                            title="補足コンテンツを表示"
                            ariaLabel="補足コンテンツを表示"
                            onClick={() => onSupportingContentClicked()}
                            disabled={!answer.context.data_points?.length}
                        />
                        <SpeechOutput answer={sanitizedAnswerHtml} />
                    </div>
                </Stack>
            </Stack.Item>

            <Stack.Item grow>
                <div className={styles.answerText} dangerouslySetInnerHTML={{ __html: sanitizedAnswerHtml }}></div>
            </Stack.Item>
        </Stack>
    );
};
