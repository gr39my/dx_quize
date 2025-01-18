interface CaseStudy {
    company: string;
    industry: string;
    challenge: string;
    solution: string;
    result: string;
}

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

interface ChecklistItem {
    text: string;
    description: string;
}

interface DXStep {
    title: string;
    description: string;
    subSteps: string[];
}

interface ToolTech {
    name: string;
    category: string;
    description: string;
}

document.addEventListener('DOMContentLoaded', () => {
    loadDetailedSteps();
    loadToolsAndTech();
    loadCaseStudies();
    loadQuiz();
    loadChecklist();
    setupAnimations();
});

async function loadDetailedSteps(): Promise<void> {
    try {
        const response = await fetch('data/detailed-steps.json');
        const steps: DXStep[] = await response.json();
        const container = document.getElementById('detailed-steps-container');
        
        if (container) {
            steps.forEach((step, index) => {
                const element = document.createElement('div');
                element.className = 'dx-step';
                element.innerHTML = `
                    <h3>${index + 1}. ${step.title}</h3>
                    <p>${step.description}</p>
                    <ul>
                        ${step.subSteps.map(subStep => `<li>${subStep}</li>`).join('')}
                    </ul>
                `;
                container.appendChild(element);
            });
        }
    } catch (error) {
        console.error('Failed to load detailed steps:', error);
    }
}

async function loadToolsAndTech(): Promise<void> {
    try {
        const response = await fetch('data/tools-tech.json');
        const toolsTech: ToolTech[] = await response.json();
        const container = document.getElementById('tools-tech-container');
        
        if (container) {
            const categories = Array.from(new Set(toolsTech.map(item => item.category)));
            
            categories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = 'tool-tech-category';
                categoryElement.innerHTML = `<h3>${category}</h3>`;
                
                const items = toolsTech.filter(item => item.category === category);
                items.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'tool-tech-item';
                    itemElement.innerHTML = `
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                    `;
                    categoryElement.appendChild(itemElement);
                });
                
                container.appendChild(categoryElement);
            });
        }
    } catch (error) {
        console.error('Failed to load tools and technologies:', error);
    }
}

async function loadCaseStudies(): Promise<void> {
    try {
        const response = await fetch('data/case-studies.json');
        const caseStudies: CaseStudy[] = await response.json();
        const container = document.getElementById('case-studies-container');
        
        if (container) {
            caseStudies.forEach(study => {
                const element = document.createElement('div');
                element.className = 'case-study';
                element.innerHTML = `
                    <h3>${study.company}</h3>
                    <p><strong>業界:</strong> ${study.industry}</p>
                    <p><strong>課題:</strong> ${study.challenge}</p>
                    <p><strong>解決策:</strong> ${study.solution}</p>
                    <p><strong>結果:</strong> ${study.result}</p>
                `;
                container.appendChild(element);
            });
        }
    } catch (error) {
        console.error('Failed to load case studies:', error);
    }
}

async function loadQuiz(): Promise<void> {
    try {
        const response = await fetch('data/quiz.json');
        const quizData: QuizQuestion[] = await response.json();
        const container = document.getElementById('quiz-container');
        
        if (container) {
            quizData.forEach((question, index) => {
                const element = document.createElement('div');
                element.className = 'quiz-question';
                element.innerHTML = `
                    <h3>問題 ${index + 1}</h3>
                    <p>${question.question}</p>
                    <div class="options">
                        ${question.options.map((option, i) => `
                            <label>
                                <input type="radio" name="q${index}" value="${i}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                    <button onclick="checkAnswer(${index}, ${question.correctAnswer})">回答する</button>
                    <p class="result" id="result-${index}"></p>
                `;
                container.appendChild(element);
            });
        }
    } catch (error) {
        console.error('Failed to load quiz:', error);
    }
}

function checkAnswer(questionIndex: number, correctAnswer: number): void {
    const selected = document.querySelector(`input[name="q${questionIndex}"]:checked`) as HTMLInputElement;
    const resultElement = document.getElementById(`result-${questionIndex}`);
    
    if (resultElement) {
        if (selected) {
            if (parseInt(selected.value) === correctAnswer) {
                resultElement.textContent = '正解です！';
                resultElement.style.color = 'green';
            } else {
                resultElement.textContent = '不正解です。もう一度試してください。';
                resultElement.style.color = 'red';
            }
        } else {
            resultElement.textContent = '回答を選択してください。';
            resultElement.style.color = 'orange';
        }
    }
}

async function loadChecklist(): Promise<void> {
    try {
        const response = await fetch('data/checklist.json');
        const checklistData: ChecklistItem[] = await response.json();
        const container = document.getElementById('checklist-container');
        
        if (container) {
            checklistData.forEach((item, index) => {
                const element = document.createElement('div');
                element.className = 'checklist-item';
                element.innerHTML = `
                    <label>
                        <input type="checkbox" id="check-${index}">
                        ${item.text}
                    </label>
                    <p class="description">${item.description}</p>
                `;
                container.appendChild(element);
            });
        }
    } catch (error) {
        console.error('Failed to load checklist:', error);
    }
}

function setupAnimations(): void {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section > div > *').forEach(el => {
        observer.observe(el);
    });
}

