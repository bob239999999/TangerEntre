db = db.getSiblingDB('entreprise');

// Utilisateurs (3 propriétaires + 17 contributeurs)
const ownerIds = [
    "689a07b889f1cc8e664de0a2",
    "689a07b889f1cc8e664de0a3",
    "689a07b889f1cc8e664de0a4"
];
const contribIds = Array.from({ length: 17 }, (_, i) =>
    "689a0b6689f1cc8e664de" + (0xa9 + i).toString(16).padStart(2, '0')
);

const owners = [
    { _id: ownerIds[0], name: "owner1", email: "owner1@entreprise.com", password: "$2b$10$gU.T6yaAgMkWGORhHDiPpuqCs9s2ZM5zlTQj/DcVqPFSO8DweNMcS", __v: 0 },
    { _id: ownerIds[1], name: "owner2", email: "owner2@entreprise.com", password: "$2b$10$gU.T6yaAgMkWGORhHDiPpuqCs9s2ZM5zlTQj/DcVqPFSO8DweNMcS", __v: 0 },
    { _id: ownerIds[2], name: "owner3", email: "owner3@entreprise.com", password: "$2b$10$gU.T6yaAgMkWGORhHDiPpuqCs9s2ZM5zlTQj/DcVqPFSO8DweNMcS", __v: 0 }
];

const contribs = Array.from({ length: 17 }, (_, i) => ({
    _id: contribIds[i],
    name: `contrib${i + 1}`,
    email: `contrib${i + 1}@entreprise.com`,
    password: "$2b$10$gU.T6yaAgMkWGORhHDiPpuqCs9s2ZM5zlTQj/DcVqPFSO8DweNMcS",
    __v: 0
}));

const users = [...owners, ...contribs];
db.users.insertMany(users);

// Projets (30)
const projectIds = Array.from({ length: 30 }, (_, i) =>
    "689a0a9d89f1cc8e664de" + (0xa7 + i).toString(16).padStart(2, '0')
);


const projects = Array.from({ length: 30 }, (_, i) => ({
    _id: projectIds[i],
    name: `project${i + 1}`, // changed from title to name
    description: `project description ${i + 1}`,
    owner: owners[i % owners.length]._id, // owner as string
    __v: 0
}));
db.projects.insertMany(projects);

const taskIds = Array.from({ length: 60 }, (_, i) =>
    "689a1e1392e95a6f2c17b" + (0x28 + i).toString(16).padStart(2, '0')
);
const tasks = Array.from({ length: 60 }, (_, i) => ({
    _id: taskIds[i],
    title: `task${i + 1}`,
    description: `task description ${i + 1}`,
    status: "TODO",
    assignedTo: contribs[i % contribs.length]._id,
    projectId: projects[i % projects.length]._id,
    __v: 0
}));
db.tasks.insertMany(tasks);

// Memberships (contribs assignés aux projets)
const membershipIds = Array.from({ length: 30 * 4 }, (_, i) =>
    "689a0c1d89f1cc8e664de" + (0xad + i).toString(16).padStart(2, '0')
);
const memberships = [];
let mIdx = 0;
projects.forEach((project, i) => {
    memberships.push({
        _id: membershipIds[mIdx++],
        userId: owners[i % owners.length]._id,
        projectId: project._id,
        role: "Owner",
        __v: 0
    });
    for (let j = 0; j < 3; j++) {
        memberships.push({
            _id: membershipIds[mIdx++],
            userId: contribs[(i * 3 + j) % contribs.length]._id,
            projectId: project._id,
            role: "Contribuidor",
            __v: 0
        });
    }
});
db.memberships.insertMany(memberships);
