// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
        {
            id: 125,
            avg: 0.985, // (47 + 150) / (50 + 150)
            1: 0.94, // 47 / 50
            2: 1.0 // 150 / 150
        },
        {
            id: 132,
            avg: 0.82, // (39 + 125) / (50 + 150)
            1: 0.78, // 39 / 50
            2: 0.833 // late: (140 - 15) / 150
        }
    ];

    return result;
}

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);

[
    // { '1': '0.94', '2': '1.00', id: 125, avg: '0.98' },
    // { '1': '0.78', '2': '0.83', id: 132, avg: '0.82' }
  ]




// Check if the assignment group belongs to the correct course
function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {

    if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw new Error("AssignmentGroup.course_id does not match CourseInfo.id");
    }

// Get the current date to compare with assignment due dates
    const currentDate = new Date();

// Object to store data for each learner
    const learnersData = {};

// Iterate through each submission
    LearnerSubmissions.forEach(submission => {
        // Find the corresponding assignment for each submission
        const assignment = AssignmentGroup.assignments.find(a => a.id === submission.assignment_id);
        if (!assignment) {
            throw new Error("Assignment not found");
        }

        for (const submission of LearnerSubmissions) {
            const LearnerID =submission.learner_id;
            const assignmentID = submission.assignment_id;

            if (!assignment) {
                continue;
            }
        }

        
// Convert due date and submission date to Date objects for comparison
        const dueDate = new Date(assignment.due_at);
        const submittedDate = new Date(submission.submission.submitted_at);

// Skip assignments not yet due
        if (dueDate > currentDate) {
            return;
        }

// Initialize data structure for each learner if not already done
        if (!learnersData[submission.learner_id]) {
            learnersData[submission.learner_id] = {
                id: submission.learner_id,
                avg: 0,
                totalPoints: 0,
                totalWeightedScore: 0
            };
        }

        const learnerData = learnersData[submission.learner_id];
        let score = submission.submission.score;
        let possiblePoints = assignment.points_possible;

// Deduct 10% if the assignment was submitted late
        if (submittedDate > dueDate) {
            score -= assignment.points_possible * 0.1;
        }  else {
            console.log("on time")
        }
        
    function validSubmission(submission, assignment) {
            const score = submission.submission.score;
            const possiblePoints = assignment.points_possible;
        
            if (possiblePoints === 0 || typeof score !== 'number' || isNaN(score)) {
                return false;
            } else {
                return true;
            }
                
        }
     
// Calculate the percentage score for the assignment and store it
        learnerData[assignment.id] = (score / assignment.points_possible).toFixed(2); //this means fixed to 2 decimal places
        learnerData.totalPoints += assignment.points_possible;
        learnerData.totalWeightedScore += score;
    });

    function getMoreLearnerData (CourseInfo, AssignmentGroup, LearnerSubmissions) {
        try {
            const { learnerData, assignmentScores} = geLearnerData (
                CourseInfo,
                AssignmentGroup,
                LearnerSubmissions
            );
            
            const results = [];
    
            for (const learnerID in learnerData) {
                const learner = learnerData[learnerID];
                const weightedAverage = getWeightedAverage(learner);
    
                const learnerResult = {
                    id: learner.id,
                    avg: weightedAverage,
                };
    
                for (const assignmentID in assignmentScores) {
                    learnerResult[assignmentID] = assignmentScores[assignmentID];
                }
                return results;
            } 
    
        } catch(error) {
            console.error(error.message);
        }
    }

    // Convert the learnersData object into the desired array format
    return Object.values(learnersData).map(learnerData => {
        // Calculate the average score for each learner
        learnerData.avg = (learnerData.totalWeightedScore / learnerData.totalPoints).toFixed(2);
        // Clean up temporary properties
        delete learnerData.totalPoints;
        delete learnerData.totalWeightedScore;
        return learnerData;
    });
}

// Call the function with the provided data and store the result
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// Log the result to the console
console.log(result);


