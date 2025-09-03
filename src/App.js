import React, { useState } from 'react';

// --- Data for the Survey ---
// This array holds all the questions, their corresponding images, and answer options.
// You can easily customize this data to create your own survey.
const surveyQuestions = [
    {
        id: 1,
        question: "Which of these landscapes do you find most relaxing?",
        image: "https://placehold.co/600x400/81C784/FFFFFF?text=Lush+Valley",
        options: ["A sunny beach", "A quiet forest", "A snowy mountain peak", "A rolling countryside"],
    },
    {
        id: 2,
        question: "What's your ideal way to spend a weekend?",
        image: "https://placehold.co/600x400/64B5F6/FFFFFF?text=Cozy+Book",
        options: ["Reading a book at home", "Exploring a new city", "Hiking a scenic trail", "Trying new restaurants"],
    },
    {
        id: 3,
        question: "Pick a color palette that appeals to you the most.",
        image: "https://placehold.co/600x400/9575CD/FFFFFF?text=Color+Swatches",
        options: ["Warm Earth Tones (Browns, Oranges)", "Cool Ocean Blues (Blues, Greens)", "Vibrant Sunset Hues (Pinks, Purples)", "Monochromatic (Black, White, Gray)"],
    },
    {
        id: 4,
        question: "Which type of art are you most drawn to?",
        image: "https://placehold.co/600x400/FFB74D/FFFFFF?text=Art+Museum",
        options: ["Classic Paintings", "Modern Sculptures", "Street Art & Graffiti", "Digital Art"],
    },
    {
        id: 5,
        question: "What is your favorite time of day?",
        image: "https://placehold.co/600x400/4DD0E1/FFFFFF?text=Sunrise",
        options: ["Early Morning Sunrise", "Bright Midday Sun", "Golden Hour Sunset", "Starry Night"],
    },
];

// --- Helper Components ---

// Progress Bar Component
// Visually shows the user's progress through the survey.
const ProgressBar = ({ current, total }) => {
    const progressPercentage = (current / total) * 100;
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};

// --- Main App Component ---
// This is the core of our application. It manages the survey's state and renders the appropriate view.
export default function App() {
    // State to track the current question index
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // State to store the user's answers. The key is the question ID, value is the selected option.
    const [answers, setAnswers] = useState({});
    // State to determine if the survey is complete
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = surveyQuestions[currentQuestionIndex];
    const totalQuestions = surveyQuestions.length;

    /**
     * Handles the user selecting an answer.
     * It saves the answer and moves to the next question or shows the results.
     * @param {string} option - The answer option selected by the user.
     */
    const handleAnswerSelect = (option) => {
        const newAnswers = { ...answers, [currentQuestion.id]: option };
        setAnswers(newAnswers);

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < totalQuestions) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setShowResults(true);
        }
    };

    /**
     * Resets the survey state to allow the user to take it again.
     */
    const handleRestartSurvey = () => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowResults(false);
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center font-sans p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-300">
                
                {/* --- Results View --- */}
                {showResults ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Survey Completed!</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Thank you for your responses.</p>
                        
                        <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 mb-6 text-left space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b-2 border-gray-200 dark:border-slate-600 pb-2">Your Answers:</h3>
                            {surveyQuestions.map(q => (
                                <div key={q.id}>
                                    <p className="font-semibold text-gray-700 dark:text-gray-200">{q.question}</p>
                                    <p className="text-blue-600 dark:text-blue-400 pl-4">- {answers[q.id]}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleRestartSurvey}
                            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-transform transform hover:scale-105"
                        >
                            Take Another Survey
                        </button>
                    </div>

                ) : (
                /* --- Question View --- */
                    <div>
                        <div className="mb-6">
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
                            <ProgressBar current={currentQuestionIndex} total={totalQuestions} />
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{currentQuestion.question}</h2>
                        </div>
                        
                        <div className="mb-6">
                            <img 
                                src={currentQuestion.image} 
                                alt="Survey visual context" 
                                className="w-full h-64 object-cover rounded-xl shadow-lg"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(option)}
                                    className="w-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-blue-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
