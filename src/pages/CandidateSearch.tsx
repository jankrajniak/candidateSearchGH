import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

import { FcPlus } from 'react-icons/fc';
import { FaMinusCircle } from 'react-icons/fa';


import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [candidateList, setCandidateList] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({} as Candidate);;

  const searchUsers = async () : Promise<void> => {
    setLoading(true);
    const results = await searchGithub();
    setSearchResults(results);
  };
  
  const fetchCandidates = async () : Promise<void>=> {
    setLoading(true);
    const candidates: Candidate[] = [];
    for (let i = 0; i < searchResults.length; i++) {
      const candidate:Candidate = await searchGithubUser(searchResults[i].login);
      if (Object.keys(candidate).length !==0) {
        candidates.push(candidate);
      }
    }
    setCandidateList(candidates);
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
    setLoading(false);
  }, [candidateList]);


  if (loading) {
    return (
      <div className = "container d-flex flex-column align-items-center">
        <h1>Candidate Search</h1>
        <p>Loading candidate data from Github, please be patient</p>
      </div>
    )};

  if (candidateList.length === 0) {
    return (
      <div className = "container d-flex flex-column align-items-center">
        <h1>Candidate Search</h1>
        <p>No additional candidates available from current batch. Refresh candidates below.</p>
        <button className="btn btn-primary" onClick={refreshSearch}>Refresh Candidates</button>
      </div>
    )
  } else {
    return (
    <div className = "container d-flex flex-column align-items-center" style={{width: '400px'}}>
      <h1 className="text-center">Candidate Search</h1>
      <div className="card rounded-bottom rounded-5 background-black m-0 p-0" style={{width: '400px'}}>
        <div className='card-body rounded-bottom rounded-5 m-0 p-0' style={{width: '400px'}}>
          <div className = "col d-flex flex-column align-items-center m-0 p-0" style={{width: '400px'}}>
            <div className = "row mb-4 m-0 p-0">
              <img src={currentCandidate?.avatar_url} alt="avatar" className="img rounded-bottom rounded-5 m-0 p-0" style={{width: '400px'}} />
            </div>
            <div className = "container text-white mb-0 p-3">
              <h3>{currentCandidate.name ? `${currentCandidate.name}` : 'Name not provided'}{`(${currentCandidate.login})`}</h3>
              <p className="fs-5"><strong>Location: </strong>{`${currentCandidate.location ? `${currentCandidate.location}` : 'Not provided'}`}</p>
              <p className="fs-5"><strong>Email: </strong>{`${currentCandidate.email ? `${currentCandidate.email}` : 'Not provided'}`}</p>
              <p className="fs-5"><strong>Company: </strong>{`${currentCandidate.company ? `${currentCandidate.company}` : 'Not provided'}`}</p>
              <p className="fs-5"><strong>Bio: </strong>{`${currentCandidate.bio ? `${currentCandidate.bio}` : 'Not provided'}`}</p>
            </div>
            <div className = "container d-flex justify-content-between" style={{width: '400px'}}>
              <FaMinusCircle className="mb-3" size={100} color="red" onClick={
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
