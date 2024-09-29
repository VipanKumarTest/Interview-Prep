name = ''
username = ''
email = ''
phone = ''
location = ''
professionalTitle = ''
summary = ''
workExperience = []
education = []
skills = []
certifications = []

const fieldConfigs = {
    workExperience: [
        { key: 'company' },
        { key: 'position' },
        { key: 'startDate' },
        { key: 'endDate' },
        { key: 'description' }
    ],
    education: [
        { key: 'college' },
        { key: 'course' },
        { key: 'branch' },
        { key: 'startYear' },
        { key: 'graduationYear' },
        { key: 'otherDetails' }
    ],
    certifications: [
        { key: 'name' },
        { key: 'issuingOrganization' },
        { key: 'issueDate' },
        { key: 'expirationDate' },
        { key: 'credentialID' }
    ]
};