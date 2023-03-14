import SettingsTab from "./tab";
import SettingsOption from "./option";
import { Button, Slider, Textarea } from "@mantine/core";
import { useCallback, useMemo } from "react";
import { defaultSystemPrompt } from "../../openai";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetSystemPrompt, selectSystemPrompt, selectTemperature, setSystemPrompt, setTemperature } from "../../store/parameters";
import { selectSettingsOption } from "../../store/settings-ui";
import { FormattedMessage, useIntl } from "react-intl";

export default function GenerationOptionsTab(props: any) {
    const intl = useIntl();
    
    const option = useAppSelector(selectSettingsOption);
    const initialSystemPrompt = useAppSelector(selectSystemPrompt);
    const temperature = useAppSelector(selectTemperature);

    const dispatch = useAppDispatch();
    const onSystemPromptChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(setSystemPrompt(event.target.value)), [dispatch]);
    const onResetSystemPrompt = useCallback(() => dispatch(resetSystemPrompt()), [dispatch]);
    const onTemperatureChange = useCallback((value: number) => dispatch(setTemperature(value)), [dispatch]);

    const resettable = initialSystemPrompt
        && (initialSystemPrompt?.trim() !== defaultSystemPrompt.trim());

    const systemPromptOption = useMemo(() => (
        <SettingsOption heading={intl.formatMessage({ defaultMessage: "Indicador del sistema" })}
                        focused={option === 'system-prompt'}>
            <Textarea
                value={initialSystemPrompt || defaultSystemPrompt}
                onChange={onSystemPromptChange}
                minRows={5}
                maxRows={10}
                autosize />
            <p style={{ marginBottom: '0.7rem' }}>
                <FormattedMessage defaultMessage="El indicador del sistema se muestra a ChatGPT por el &quot;Sistema&quot; antes de su primer mensaje. La  <code>'{{ datetime }}'</code> se reemplaza automáticamente por la fecha y la hora actuales."
                    values={{ code: chunk => <code style={{ whiteSpace: 'nowrap' }}>{chunk}</code> }} />
            </p>
            {resettable && <Button size="xs" compact variant="light" onClick={onResetSystemPrompt}>
                <FormattedMessage defaultMessage="Restablecer a lo predeterminado" />
            </Button>}
        </SettingsOption>
    ), [option, initialSystemPrompt, resettable, onSystemPromptChange, onResetSystemPrompt]);

    const temperatureOption = useMemo(() => (
        <SettingsOption heading={intl.formatMessage({ defaultMessage: "Temperatura: {temperature, number, ::.0}", }, { temperature })}
                        focused={option === 'temperature'}>
            <Slider value={temperature} onChange={onTemperatureChange} step={0.1} min={0} max={1} precision={3} />
            <p>
                <FormattedMessage defaultMessage="El parámetro de temperatura controla la aleatoriedad de las respuestas de la IA. Los valores más bajos harán que la IA sea más predecible, mientras que los valores más altos la harán más creativa." />
            </p>
        </SettingsOption>
    ), [temperature, option, onTemperatureChange]);

    const elem = useMemo(() => (
        <SettingsTab name="options">
            {systemPromptOption}
            {temperatureOption}
        </SettingsTab>
    ), [systemPromptOption, temperatureOption]);

    return elem;
}