import { EmployeeList } from "../components/EmployeeList";
import Footer from "../components/Footer";

// EmployeePage component renders the EmployeeList component
export function EmployeePage() {
    return (
        <> 
        <EmployeeList />
        <br></br>
        <Footer />
        </>
    )
}

