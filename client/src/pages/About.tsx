const About = ({ hasAccess }: { hasAccess: boolean }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-300 rounded-lg p-6 shadow-lg">
        Welcome to The Electroneum CrowdFunding Platform!
      </h1>
      <p className="text-3xl font-bold text-gray-300 rounded-lg p-6 shadow-lg">
        A blockchain-based crowdfunding solution utilizing Electroneum's
        cryptocurrency (ETN) to connect project creators with backers worldwide.
        The platform leverages Electroneum's mobile-friendly infrastructure to
        enable micro-investments and transparent fund distribution through smart
        contracts, with lower transaction fees than traditional crowdfunding
        services. Creators can showcase projects, set funding goals, and offer
        ETN-based rewards, while backers benefit from secure transactions and
        potentially increased value of their ETN investments.
      </p>
      {hasAccess ? (
        <>
          <h2 className="text-3xl font-bold text-gray-300 rounded-lg p-6 shadow-lg">
            Key Features
          </h2>
          <div className="container">
            <button type="button">Available Campaigns</button> // when clicked
            to /available-campaigns
            <button type="button">Past Camapigns</button> // when clicked to
            /past-campaigns
          </div>
        </>
      ) : (
        <p className="text-center text-xl font-medium text-gray-300 bg-gray-800 rounded-lg p-6 shadow-lg mt-8">
          Connect Wallet and set network to Electroneum testnet to access this
          application
        </p>
      )}
    </>
  );
};

export default About;
