import type { PropsWithChildren, MouseEvent } from 'react';
import { WithClassnameType } from 'types';
// import { RugContract } from '../../pages/Dashboard/widgets/RugContract';
import { AbiRegistry, Address, SmartContract } from "@multiversx/sdk-core/out";

import abiJson from "./rug-royalties.abi.json";

const abiRegistry = AbiRegistry.create(abiJson);
const rugContract = new SmartContract({
  address: new Address("erd1qqqqqqqqqqqqqpgqkraxy5tk5rtdpu4e4svxr2u3wspqs2knks0s6jcx33"),
  abi: abiRegistry,
});

interface ButtonType extends WithClassnameType, PropsWithChildren {
  onClick: (e: MouseEvent) => void;
  disabled?: boolean;
  dataTestId?: string;
  dataCy?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}
const provider = new ApiNetworkProvider(apiAddress, { timeout: 10000 });

const interaction = rugContract.methods.contractDetails([]);
const query = interaction.buildQuery();
const queryResponse = await provider.queryContract(query);

const { firstValue } = resultsParser.parseQueryResponse(
  queryResponse,
  interaction.getEndpoint()
);

const values = firstValue?.valueOf();

const sendNfts = async () => {
  const { account } = useGetAccountInfo();
  const network = useGetNetworkConfig(); 

  // nfts to send
  const payments = [ 
    TokenTransfer.nonFungible(
      "SUBJECT2-612471", // nft identifier
      1, // nft nonce
    ),
  ];

  await refreshAccount();
  const transaction = rugContract.methods
    .swap(["SUBJECT2-612471"])
    .withGasLimit(10_000_000) // will have to find a good approximation for this hardcode a value that works for now
    .withMultiESDTNFTTransfer(payments)
    .withSender(new Address(account.address))
    .withChainID(network.chainID); // this was needed in a previous version of the library, there was a stupid bug, i dont think it is still needed but just in case you run into problems

  const transactionFinal = transaction.buildTransaction();
  const { sessionId } = await sendTransactions({
    transactions: [transactionFinal],
    transactionsDisplayInfo: {
      processingMessage: "Rugging...",
      errorMessage: "An error has occured ",
      successMessage: "Successful",
      transactionDuration: 10000,
    },
  });
}

export const ButtonTx = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  id,
  className = 'inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-black text-white hover:bg-rose-800 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed',
  ...otherProps
}: ButtonType) => {
  return (
    <button
      id={id}
      data-testid={otherProps['data-testid']}
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
};
