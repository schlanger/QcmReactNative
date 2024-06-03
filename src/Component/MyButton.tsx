import React from 'react';
import { Button } from 'react-native-paper';

const MyButton = ({ handleRedirect }: { handleRedirect: () => void }) => {
    return (
        <Button mode="elevated" onPress={handleRedirect}>
            Commencer le QCM !!
        </Button>
    );
};

export default MyButton;
