import { BooleanInput, Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin"

const ChallengeOptionEdit = () => {
    return (
        <Edit>
            <SimpleForm >
                <TextInput source="text" validate={[required()]} label="text" />
                <BooleanInput
                    source="correct"
                    label="Correct options"
                />
                <ReferenceInput
                    source="challengeId"
                    reference="challenges"
                />
                <TextInput
                    source="imageSrc"
                    label="Image URL"
                />

                <TextInput
                    source="audioSrc"
                    label="Audio URL"
                />
            </SimpleForm>
        </Edit>
    );
}

export default ChallengeOptionEdit;
