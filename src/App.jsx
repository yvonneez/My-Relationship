import { useState } from "react";
import { questions } from "./questions";
import { options } from "./options";
import Footer from "./Footer";

export default function RelationshipApp() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelect = (value) => setAnswers({ ...answers, [current]: value });

  const next = () => {
    if (!answers[current]) return alert("Select an option first");
    setCurrent(current + 1);
  };

  const prev = () => current > 0 && setCurrent(current - 1);

  const calculate = () => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    let message =
      total >= 40
        ? "You seem to have a thriving relationship."
        : total >= 30
        ? "You might need to work on your relationship, consider counselling."
        : "Your relationship needs serious attention.";

    setResult(`Your Score: ${total} → ${message}`);
    setCurrent(questions.length);
  };

  if (current === questions.length)
    return (
      <div className="min-h-screen w-full bg-purple-700 text-white flex flex-col justify-between p-6">
        <h2 className="text-2xl font-bold mb-4">Result</h2>
        <p className="text-lg mb-6">{result}</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={() => window.location.reload()}>
          Restart
        </button>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-purple-700 text-white flex flex-col justify-between p-6">
      <h2 className="text-2xl font-bold mb-4">Relationship Assessment</h2>
      <div className="mb-6">
        <p className="text-lg font-semibold mb-4">{current + 1}. {questions[current]}</p>
        {options[current].map((opt, i) => (
          <label key={i} className="block mb-3 cursor-pointer">
            <input type="radio" name={`q${current}`} checked={answers[current] === opt.value} onChange={() => handleSelect(opt.value)} className="mr-2" />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        {current > 0 && (
          <button className="px-4 py-2 bg-gray-400 text-white rounded-xl" onClick={prev}>Previous</button>
        )}
        {current < questions.length - 1 ? (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={next}>Next</button>
        ) : (
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl" onClick={calculate}>Submit</button>
        )}
      </div>

      <Footer />
    </div>
  );
}
