import { useBetween } from "use-between";
import React, { useEffect } from "react";

const useShareableState = () => {
  const [dataQueries, setDataQueries] = React.useState<Array<object>>([]);
  const [rootQueries, setRootQueries] = React.useState<Array<object>>([]);
  const [typeQueries, setTypeQueries] = React.useState<Array<object>>([]);
  const [rootMutations, setRootMutations] = React.useState<Array<object>>([]);
  const [typeMutations, setTypeMutations] = React.useState<Array<object>>([]);
  const [tempPair, setTempPair] = React.useState<Array<string>>([]);
  const [connectedPair, setConnectedPair] = React.useState<
    Array<Array<string>>
  >([]);
  const [relaventContent, setRelaventContent] = React.useState<object>({});
  const [matched, setMatched] = React.useState<any>({});
  const [datatIdCount, setDataIdCount] = React.useState<number>(0);
  const [updateCode, setUpdateCode] = React.useState<boolean>(true);

  return {
    dataQueries,
    setDataQueries,
    rootQueries,
    setRootQueries,
    typeQueries,
    setTypeQueries,
    rootMutations,
    setRootMutations,
    typeMutations,
    setTypeMutations,
    tempPair,
    setTempPair,
    connectedPair,
    setConnectedPair,
    relaventContent,
    setRelaventContent,
    matched,
    setMatched,
    datatIdCount,
    setDataIdCount,
    updateCode,
    setUpdateCode,
  };
};

export default useShareableState;
