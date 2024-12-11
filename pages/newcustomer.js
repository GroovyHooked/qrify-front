import NewCustomer from "../components/newCustomer";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function NewcustomerPage() {
  return (
    <>
      {/* <Navbar toto="logo" /> prevoir lien vers logo du compte du commercant */}
      <NewCustomer />
      <Footer />
    </>
  );
}

export default NewcustomerPage;
