'use client';

import { useState, useRef } from 'react';

interface Child {
  id: string;
  name: string;
  grade: string;
  weakAreas: string[];
  progress: { [subject: string]: number };
}

interface HomeworkResult {
  problem: string;
  solution: string;
  explanation: string;
  practiceQuestions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function HomeworkHelper() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [homeworkResult, setHomeworkResult] = useState<HomeworkResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChild) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResult: HomeworkResult = {
        problem: "Solve: 2x + 5 = 13",
        solution: "x = 4",
        explanation: "First, subtract 5 from both sides: 2x = 8. Then divide both sides by 2: x = 4",
        practiceQuestions: [
          "Solve: 3x + 7 = 16",
          "Solve: 4x - 2 = 14", 
          "Solve: 5x + 3 = 23"
        ],
        difficulty: 'medium'
      };
      setHomeworkResult(mockResult);
      setIsProcessing(false);
    }, 2000);
  };

  const addChild = (name: string, grade: string) => {
    const newChild: Child = {
      id: Date.now().toString(),
      name,
      grade,
      weakAreas: [],
      progress: {}
    };
    setChildren([...children, newChild]);
    setShowAddChild(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 AI Homework Helper
          </h1>
          <p className="text-gray-600">
            Take a photo of math homework and get personalized help
          </p>
        </div>

        {/* Child Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Select Child</h2>
            <button
              onClick={() => setShowAddChild(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Child
            </button>
          </div>

          {children.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Add a child to get started
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {children.map((child) => (
                <div
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedChild === child.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800">{child.name}</h3>
                  <p className="text-gray-600">Grade {child.grade}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Photo Upload */}
        {selectedChild && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Homework Photo
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="text-6xl mb-4">📸</div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Take Photo of Homework'}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {homeworkResult && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📝 Solution & Explanation
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Problem:</h3>
                <p className="text-gray-800">{homeworkResult.problem}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Solution:</h3>
                <p className="text-green-800 text-lg font-medium">{homeworkResult.solution}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-2">Step-by-Step Explanation:</h3>
                <p className="text-blue-800">{homeworkResult.explanation}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-2">Practice Questions:</h3>
                <ul className="space-y-2">
                  {homeworkResult.practiceQuestions.map((question, index) => (
                    <li key={index} className="text-purple-800">
                      {index + 1}. {question}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Daily Report Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📊 Evening Learning Report
          </h2>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800">
              Daily reports will be generated each evening focusing on challenging math concepts and personalized improvement recommendations.
            </p>
          </div>
        </div>

        {/* Add Child Modal */}
        {showAddChild && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Add New Child</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') as string;
                  const grade = formData.get('grade') as string;
                  if (name && grade) {
                    addChild(name, grade);
                  }
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Child's Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level
                  </label>
                  <select
                    name="grade"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Grade</option>
                    {Array.from({ length: 13 }, (_, i) => (
                      <option key={i} value={i === 0 ? 'K' : i.toString()}>
                        {i === 0 ? 'Kindergarten' : `Grade ${i}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Child
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddChild(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

