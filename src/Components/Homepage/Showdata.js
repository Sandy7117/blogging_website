import Content from "./Content";
const Showdata = ({ passData }) => {
  return (
    <div>
      {passData.map((arrange) => (
        <Content
          key={arrange.id}
          id={arrange.id}
          image={arrange.image}
          title={arrange.title}
          description={arrange.description}
          email={arrange.email}
        />
      ))}
    </div>
  );
};

export default Showdata;
