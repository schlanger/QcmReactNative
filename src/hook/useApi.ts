import {router, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import axios from "axios";



export function useApi(displayedText?: string) {

    const params = useLocalSearchParams();
    const [question, setQuestion] = useState<string | null>(null);
    const [questionId, setQuestionId] = useState<number>(1);
    const [responses, setResponses] = useState<{ title: string; correct: boolean }[]>([]);
    const [score, setScore] = useState<number>(0);

    const fetchQuestionById = async (id: number) => {
        try {
            const response = await axios.get(`https://qcm-api-a108ec633b51.herokuapp.com/questions/${id}`);
            return response.data.rows[0].intitule;
        } catch (error) {
            console.error('Error fetching question:', error);
            return null;
        }
    };

    const fetchResponsesByQuestionId = async (id: number) => {
        try {
            const response = await axios.get(`https://qcm-api-a108ec633b51.herokuapp.com/reponse/${id}`);
            return response.data.rows.map((row: any) => ({title: row.titre, correct: row.correct}));
        } catch (error) {
            console.error('Error fetching responses:', error);
            return [];
        }
    };

    const checkAnswer = (selectedAnswer: string) => {
        const correctAnswer = responses.find(response => response.title === selectedAnswer);
        console.log('Correct answer:', correctAnswer);
        if (correctAnswer && correctAnswer.correct) {
            setScore(prevScore => prevScore + 1);
        }

        goToNextQuestion();
    };
    const goToNextQuestion = async () => {
        const nextQuestionId = questionId + 1;
        if (nextQuestionId > 4) {
            router.navigate({
                pathname: '/',
            });
            return;
        }
        const result = await fetchQuestionById(nextQuestionId);
        const responses = await fetchResponsesByQuestionId(nextQuestionId);
        setQuestionId(nextQuestionId);
        setQuestion(result);
        setResponses(responses);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchQuestionById(1);
            const responses = await fetchResponsesByQuestionId(1);
            setQuestion(result);
            setResponses(responses);
        };

        fetchData();
    }, []);

    return {
        question,
        responses,
        score,
        checkAnswer,
        goToNextQuestion,
        params,
    };

}