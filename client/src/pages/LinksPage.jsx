import React, {useState, useContext, useCallback, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';

import Loader from '../components/Loader';
import LinksList from '../components/LinksList';

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);

  const fecthLinks = useCallback(async ()=>{
    try {
      const fetched = await request('api/link/', 'GET', null, {
        'Authorization': `Bearer ${token}`
      });
      setLinks(fetched);
    } catch (error) {}
  }, [token, request]);

  useEffect(() => {
    fecthLinks();
  }, [fecthLinks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  );
}

export default LinksPage;