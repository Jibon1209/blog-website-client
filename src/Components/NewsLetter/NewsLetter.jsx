import { Button, Card, TextInput } from "flowbite-react";
import { toast } from "react-toastify";

const NewsLetter = () => {
  const resetForm = () => {
    document.getElementById("newsLetter").reset();
  };
  const handleSubscribe = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      resetForm();
      return;
    }
  };
  return (
    <div className="mt-20">
      <Card className="max-w-full bg-accentDark">
        <h5 className="text-xl md:text-3xl lg:text-5xl font-bold tracking-tight text-center text-white dark:text-white">
          Subscribe to Our Newsletter
        </h5>
        <form
          id="newsLetter"
          onSubmit={handleSubscribe}
          className="flex md:flex-row flex-col justify-center items-center pt-8 gap-2"
        >
          <div className="w-[300px]">
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          <Button type="submit" className="bg-accent hover:bg-accentDark">
            Subscribe
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default NewsLetter;
