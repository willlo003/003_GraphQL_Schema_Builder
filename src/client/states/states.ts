import { useBetween } from "use-between";
import React, { useEffect } from "react";

const useShareableState = () => {
  const [dataQueries, setDataQueries] = React.useState<Array<object>>([]);
  const [rootQueries, setRootQueries] = React.useState<Array<string>>([]);
  const [typeQueries, setTypeQueries] = React.useState<Array<string>>([]);
  const [dataMutations, setDataMutations] = React.useState<Array<object>>([]);
  const [rootMutations, setRootMutations] = React.useState<Array<string>>([]);
  const [typeMutations, setTypeMutations] = React.useState<Array<string>>([]);
  const [tempPair, setTempPair] = React.useState<Array<string>>([]);
  const [connectedPair, setConnectedPair] = React.useState<
    Array<Array<string>>
  >([]);
  const [relaventContent, setRelaventContent] = React.useState<object>({});
  const [matched, setMatched] = React.useState<any>({});
  const [rootQueryCards, setRootQueryCards] = React.useState<Array<string>>([]);
  const [typeQueryCards, setTypeQueryCards] = React.useState<Array<string>>([]);
  const [dataQueryCards, setDataQueryCards] = React.useState<Array<string>>([]);
  const [rootMutationCards, setRootMutationCards] = React.useState<
    Array<string>
  >([]);
  const [typeMutationCards, setTypeMutationCards] = React.useState<
    Array<string>
  >([]);

  const [datatIdCount, setDataIdCount] = React.useState<number>(0);

  return {
    dataQueries,
    setDataQueries,
    rootQueries,
    setRootQueries,
    typeQueries,
    setTypeQueries,
    dataMutations,
    setDataMutations,
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
    rootQueryCards,
    setRootQueryCards,
    typeQueryCards,
    setTypeQueryCards,
    dataQueryCards,
    setDataQueryCards,
    rootMutationCards,
    setRootMutationCards,
    typeMutationCards,
    setTypeMutationCards,
    datatIdCount,
    setDataIdCount,
  };
};

export default useShareableState;
