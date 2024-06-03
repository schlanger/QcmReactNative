import React from 'react';
import { Button } from 'react-native-paper';

const MyButton = ({ handleRedirect, buttonText }: { handleRedirect: () => void; buttonText: string }) => {
    return (
        <Button mode="elevated" onPress={handleRedirect}>
            {buttonText}
        </Button>
    );
};

export default MyButton;
