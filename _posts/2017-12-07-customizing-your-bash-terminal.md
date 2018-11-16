---
layout: post
title: Customizing Your Bash Prompt
description: A quick explanation of how you can customize the prompt that's shown in your bash terminal.
---

Customizing your command line prompt is pretty simple and can be quite powerful. You're given many different variables to use inside of your prompt, and if that isn't enough, then you can write your own function that will dynamically create the prompt after each command.

---

## A Static Prompt

Creating a static prompt is quite easy, all you need to do is export a `PS1` environment variable with the prompt you would like.

```bash
export PS1="Lame Prompt: "
```

The resulting prompt will always be the same though, which isn't very exciting:

```
Lame Prompt:
```

---

## Adding Some Useful Information

There are a number of variables you have access that allow you to add some useful information to your prompt. You can see a list of these variables at the [bottom of this post](#available-variables)

This prompt will show the time and current directory when the command was executed.

```bash
export PS1="[\@][\w]: "
```

Now your prompt should look similar to the following:

```
[05:41 PM][~/Documents/projects]:
```

---

## Making a Dynamic Prompt

Using only what's provided, you should be able to create a pretty nice prompt for yourself. There are still some things that you just can't do, and that's change the structure or content of your prompt without changing the `PS1` environment variable.

Fortunately, there's a lesser known environment variable, `PROMPT_COMMAND`, that allows you to execute a function each time the prompt should be generated.

Now, you can add a bash function to your `.bash_profile` or `.bashrc` that exports the `PS1` environment variable for you. Here's an example that will show the exit status of the previous command as well as the current directory:

```bash
function makePS1 {
  # $? is a bash variable that hold the exit status of the previous command.
  # This must be done first to preserve the last exit status
  local last_exit_status=$?

  export PS1="[${last_exit_status}][\w]: "
}

export PROMPT_COMMAND=makePS1
```

Once that's added to your `.bash_profile` or `.bashrc` and you restart your terminal, you can experiment with different commands to see how the prompt changes:

```
[0][~/Documents/projects]: badcommand
-bash: badcommand: command not found
[127][~/Documents/projects]: echo "good command"
good command
[0][~/Documents/projects]:
```

Now the data that can be displayed in your prompt is nearly unlimited. You can display the output of any commands or anything else you'd like!

---

## My Prompt

Over the years, I've slowly narrowed down the information that I like to see in my prompt. Here's what my prompt looks like on a normal day (some parts aren't shown in this example):

```
[ ~/Documents/projects ][ victorjohnson ]
[0][41] - $:
```

Here's a breakdown of each piece of information (grouped inside square brackets):

1. The current working directory
2. The currently logged in user
3. The exit status of the previous command
4. The command number of this command (how many commands have been executed in this terminal)

And the parts that aren't shown:

1. The current git branch (only if I'm inside a git repository)
2. The hostname of the current machine (only if I'm logged into a remote machine)

And here is the code that generates my prompt for me:

```bash
function makePS1 {
  # This must be done first to preserve the last exit status
  local last_exit_status=$?

  # If you are in a git repo, then add the current branch to the prompt
  local branch=$(__git_ps1 "%s")

  if [[ ${branch} != "" ]]; then
    branch="[ ${branch} ]"
  fi

  # If you are on a remote machine, the add the host name to the prompt
  if [ -n "$SSH_CLIENT" ] || [ -n "$SSH_TTY" ] || [ -n "$SSH_CONNECTION" ]; then
    my_host="[ ${host} ]"
  else
    my_host=""
  fi

  # Put it all together
  export PS1="\n[ \w ][ \u ]${my_host}${branch}\n"
  export PS1+="[${last_exit_status}][\#] - $: "
}

export PROMPT_COMMAND=makePS1
```

*Note:* The git branch addition requires you to have the git-prompt utility installed on your machine. If you're interested, it can be found on [GitHub](https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh)

---

## Conclusion

Although the examples shown in this post may be small and perhaps not *extremely* useful, hopefully it gave you the knowledge and inspiration to create your own awesome prompt. If you have any questions or suggestions feel free to create an issue in this [GitHub repository](https://github.com/vicjohnson1213/vicjohnson1213.github.io/issues)

---

## Available Variables

| Variable | What it does                                                                      |
|:---------|:----------------------------------------------------------------------------------|
| \a       | An ASCII bell character (07)                                                      |
| \d       | The date in “Weekday Month Date” format (e.g., “Tue May 26”)                      |
| \e       | An ASCII escape character (033)                                                   |
| \h       | The hostname up to the first ‘.’                                                  |
| \H       | The hostname                                                                      |
| \j       | The number of jobs currently managed by the shell                                 |
| \l       | The basename of the shell's terminal device name                                  |
| \n       | Newline                                                                           |
| \r       | Carriage return                                                                   |
| \s       | The name of the shell, the basename of $0 (the portion following the final slash) |
| \t       | The current time in 24-hour HH:MM:SS format                                       |
| \T       | The current time in 12-hour HH:MM:SS format                                       |
| \@       | The current time in 12-hour am/pm format                                          |
| \A       | The current time in 24-hour HH:MM format                                          |
| \u       | The username of the current user                                                  |
| \v       | The version of bash (e.g., 2.00)                                                  |
| \V       | The release of bash, version + patch level (e.g., 2.00.0)                         |
| \w       | The current working directory                                                     |
| \W       | The basename of the current working directory                                     |
| \\!      | The history number of this command                                                |
| \\#      | The command number of this command                                                |
| \\$      | If the effective UID is 0, a #, otherwise a $                                     |
| \nnn     | The character corresponding to the octal number nnn                               |
| \\\\     | A backslash                                                                       |
| \\[      | Begin a sequence of non-printing characters                                       |
| \\]      | End a sequence of non-printing characters                                         |
