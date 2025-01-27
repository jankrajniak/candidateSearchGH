import { useState, useEffect } from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import type Candidate from '../interfaces/Candidate.interface';



const SavedCandidates = () => {

  const [candidateList, setCandidateList] = useState<Candidate[]>([]);
  
  const retrieveStoredCandidates = async (): Promise<void> => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      const parsedCandidates: Candidate[] = await JSON.parse(storedCandidates);
      setCandidateList(parsedCandidates);
    } 
  }

  useEffect(() => {
    retrieveStoredCandidates();
  },[])

  const removeCandidate = async (login:string) => {
    const newCandidateList: Candidate[] = candidateList.filter((candidate: Candidate) => candidate.login !== login);
    localStorage.setItem('candidates', JSON.stringify(newCandidateList));
    retrieveStoredCandidates();
  }

  if (candidateList.length === 0) {
    return (
      <div className="container">
        <h1>Saved Candidates</h1>
        <h2>No candidates have been saved</h2>
      </div> )};

  return (
    <div className="container">
      <h1>Saved Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th className="text-center">Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidateList.map((candidate: Candidate, ) => (
            <tr key={candidate.login}>
              <td><img src={candidate.avatar_url} alt="avatar" width="100" height="100" className = "m-4 rounded-4"/></td>
              <td><h3>{candidate.name ? `${candidate.name}` : 'Not provided'}{`(${candidate.login})`}</h3></td>
              <td>{candidate.location ? `${candidate.location}` : 'Not provided'}</td>
              <td>{candidate.email ? `${candidate.email}` : 'Not provided'}</td>
              <td>{candidate.company ? `${candidate.company}` : 'Not provided'}</td>
              <td>{candidate.bio ? `${candidate.bio}` : 'Not provided'}</td>
              <td><FaMinusCircle size={100} color="red" onClick={() => removeCandidate(candidate.login)} className = "m-4"/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
