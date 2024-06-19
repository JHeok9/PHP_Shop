<?php
require_once "include/header.php";
?>

    <main>
        <section class="login-form">
            <h1>Login</h1>
            <form id="loginForm" action="../user/login.php" method="POST">
                <label for="id">Username:</label>
                <input type="text" id="id" name="id" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <button type="submit">Login</button>
                <a href="join.php" class="register-link">회원가입</a>
            </form>
        </section>
    </main>
   
<?php require_once "include/footer.php"; ?>