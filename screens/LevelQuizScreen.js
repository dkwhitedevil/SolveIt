import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Easing } from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

const GradientButton = ({ colors, text, onPress, disabled, style, accessibilityLabel }) => (
  <LinearGradient colors={colors} style={[styles.gradientButton, style]}>
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.gradientButtonContent}
      accessibilityLabel={accessibilityLabel}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  </LinearGradient>
);

const QuizOption = ({ option, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[styles.optionButton, isSelected && styles.selectedOption]}
    onPress={onSelect}
    accessibilityLabel={`Select option ${option}`}
  >
    <Text style={styles.optionText}>{option}</Text>
  </TouchableOpacity>
);

const LevelQuizScreen = ({ route, navigation }) => {
  const { levelData } = route.params || {};
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  if (!levelData || !levelData.questions || levelData.questions.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>No quiz data available. Please try again later.</Text>
        <GradientButton
          colors={['#ff6347', '#ff4500']}
          text="Retry"
          onPress={() => navigation.goBack()}
          style={styles.retryButton}
        />
      </View>
    );
  }

  const slideButton = (direction) => {
    const toValue = direction === 'next' ? screenWidth : -screenWidth;
    Animated.timing(slideAnim, {
      toValue,
      duration: 500, // Increased duration for smoother transition
      easing: Easing.out(Easing.ease), // Smooth easing function
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(0); // Reset the animation
      if (direction === 'next' && currentQuestionIndex < levelData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (direction === 'prev' && currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    });
  };

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const calculateScore = () => {
    const totalScore = levelData.questions.reduce(
      (score, question) => (selectedAnswers[question.id] === question.answer ? score + 1 : score),
      0
    );
    setScore(totalScore);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setScore(null);
    setShowResult(false);
    setCurrentQuestionIndex(0);
  };

  const getComment = () => {
    const percentage = (score / levelData.questions.length) * 100;
    if (percentage === 100) return "Excellent! 🎉 You're a genius!";
    if (percentage >= 80) return "Great job! 👍";
    if (percentage >= 50) return "Good try! Keep practicing.";
    return "Better luck next time. You'll get it!";
  };

  const question = levelData.questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>{`Level ${levelData.level}`}</Text>
      <Text style={styles.questionNumberText}>{`Question ${currentQuestionIndex + 1} of ${levelData.questions.length}`}</Text>
      <Text style={styles.title}>{levelData.title}</Text>

      {!showResult ? (
        <>
          <Animated.View style={[styles.questionContainer, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.questionText}>{question.question}</Text>
            {question.options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                isSelected={selectedAnswers[question.id] === option}
                onSelect={() => handleAnswerSelect(question.id, option)}
              />
            ))}
          </Animated.View>

          <Animated.View style={[styles.navigationButtons, { transform: [{ translateX: slideAnim }] }]}>
            <GradientButton
              colors={['#1e90ff', '#32cd32']}
              text="←Previous"
              onPress={() => slideButton('prev')}
              disabled={currentQuestionIndex === 0}
              accessibilityLabel="Go to previous question"
            />
            <GradientButton
              colors={['#1e90ff', '#32cd32']}
              text="Next→"
              onPress={() => slideButton('next')}
              disabled={currentQuestionIndex === levelData.questions.length - 1}
              accessibilityLabel="Go to next question"
            />
          </Animated.View>

          {currentQuestionIndex === levelData.questions.length - 1 && (
            <GradientButton
              colors={['#32cd32', '#1e90ff']}
              text="Submit"
              onPress={calculateScore}
              style={styles.submitButton}
              accessibilityLabel="Submit quiz"
            />
          )}
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.scoreText}>
            Your Score: {score}/{levelData.questions.length}
          </Text>
          <Text style={styles.resultMessage}>{getComment()}</Text>
          <GradientButton
            colors={['#ff6347', '#ff4500']}
            text="Retry"
            onPress={resetQuiz}
            style={styles.resetButton}
            accessibilityLabel="Retry quiz"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 20 },
  levelText: { fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 5 },
  questionNumberText: { fontSize: 18, color: 'white', textAlign: 'center', marginBottom: 20 },
  questionContainer: { marginBottom: 20 },
  questionText: { fontSize: 20, color: 'white', marginBottom: 15 },
  optionButton: { backgroundColor: '#1e90ff', padding: 10, borderRadius: 5, marginBottom: 10 },
  selectedOption: { backgroundColor: '#32cd32' },
  optionText: { fontSize: 18, color: 'white' },
  navigationButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  gradientButton: { borderRadius: 5 },
  gradientButtonContent: { paddingVertical: 12, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 18, color: 'white', textAlign: 'center', width: 100, height: 20 },
  submitButton: { marginTop: 20 },
  resultContainer: { alignItems: 'center', marginTop: 20 },
  scoreText: { fontSize: 20, color: 'white', marginBottom: 10 },
  resultMessage: { fontSize: 24, color: 'gold', textAlign: 'center', width: 300, height: 34 },
  resetButton: { marginTop: 20 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorMessage: { fontSize: 18, color: 'white', textAlign: 'center' },
  retryButton: { marginTop: 20 },
});

export default LevelQuizScreen;
