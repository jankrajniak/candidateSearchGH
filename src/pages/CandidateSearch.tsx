import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

import { FcPlus } from 'react-icons/fc';
import { FaMinusCircle } from 'react-icons/fa';


import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [candidateList, setCandidateList] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: '',
    login: '',
    avatar_url: '',
    company: '',
    location: '',
    bio: '',
    email: '',
  });

  const searchUsers = async () : Promise<void> => {
    setLoading(true);
    const results = await searchGithub();
    setSearchResults(results);
  };
  
  const fetchCandidates = async () : Promise<void>=> {
    setLoading(true);
    const candidateList: Candidate[] = [];
    for (let i = 0; i < searchResults.length; i++) {
      const candidate:Candidate = await searchGithubUser(searchResults[i].login);
      if (Object.keys(candidate).length !==0) {
        candidateList.push(candidate);
      }
    }
    setCandidateList(candidateList);
    setCurrentCandidate(candidateList[0]);
    setLoading(false);
  };

  const removeCurrentCandidate = () => {
    const newCandidateList: Candidate[] = candidateList.filter((candidate: Candidate) => candidate.login !== currentCandidate.login);
    setCandidateList(newCandidateList);
  }

  const addCandidateToList = async () => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      const parsedStoredCandidates = await JSON.parse(storedCandidates);
      const newCandidateList = [...parsedStoredCandidates, currentCandidate];
      localStorage.setItem('candidates', JSON.stringify(newCandidateList));
    } else {
      localStorage.setItem('candidates', JSON.stringify([currentCandidate]));
    }
  }

  const refreshSearch = () => {
    searchUsers();
  }

  useEffect(() => {
    searchUsers();
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [searchResults]);

  useEffect(() => {
    setCurrentCandidate(candidateList[0]);
  }, [candidateList]);


  if (loading) {
    return (
      <div className = "container">
        <h1>Candidate Search</h1>
        <h2>Loading candidate data from Github, please be patient</h2>
      </div>
    )};

  if (candidateList.length === 0) {
    return (
      <div className = "container">
        <h1>Candidate Search</h1>
        <h2>No more candidates available</h2>
        <button className="btn btn-primary" onClick={refreshSearch}>Refresh Candidates</button>
      </div>
    )
  } else {
    return (
    <div className = "container w-750">
      <h1 className="text-center">Candidate Search</h1>
      {/* Will have to add a function to display "no more candidates available" when the searchResults array is empty */}
      {/* Can potentially include a button to refresh candidates */}
      <div className="card rounded-bottom rounded-5 background-black">
        <div className='card-body rounded-bottom rounded-5'>
          <div className = "col d-flex flex-column align-items-center">
            <div className = "row-md-4">
              <img src={currentCandidate?.avatar_url} alt="avatar" className="img-thumbnail rounded-bottom rounded-5" />
            </div>
            <div className = "row-md-8 text-white">
              <h2>{currentCandidate.name ? `${currentCandidate.name}` : 'Not provided'}{`(${currentCandidate.login})`}</h2>
              <h3>{`Location: ${currentCandidate.location ? `${currentCandidate.location}` : 'Not provided'}`}</h3>
              <h3>{`Email: ${currentCandidate.email ? `${currentCandidate.email}` : 'Not provided'}`}</h3>
              <h3>{`Company: ${currentCandidate.company ? `${currentCandidate.company}` : 'Not provided'}`}</h3>
              <p>{`Bio: ${currentCandidate.bio ? `${currentCandidate.bio}` : 'Not provided'}`}</p>
            </div>
            <div className = "row-md-8 d-flex flex-row justify-content-space-between">
              <FaMinusCircle size={100} color="red" onClick={
                () => {
                  console.log('Remove candidate');
                  removeCurrentCandidate();
              }}/>
              <FcPlus size={100} onClick={
                () => {
                  console.log('Add candidate to saved candidates')
                  addCandidateToList();
                  removeCurrentCandidate();
                }}/>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};
};

export default CandidateSearch;
