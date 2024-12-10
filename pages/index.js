import Signup from "../components/signup";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function Index() {
  return (
    <div>
      <Navbar toto="Inscription" />
      <Signup />
      <Footer />
    </div>
  );
}

export default Index;
