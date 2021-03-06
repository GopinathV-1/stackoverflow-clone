from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# gravtar default address with size 90
gravtar_add = 'https://www.gravatar.com/avatar/{0}?s=90&d=identicon&r=PG'


class Profile(models.Model):
    '''Schema for extended user(Profile)'''

    # one to one relation with user
    user = models.OneToOneField(
        User,
        related_name='profile',
        on_delete=models.CASCADE
    )

    # role attribute default to user
    role = models.CharField(max_length=100, default='user')

    # photo attribute default refer to gravatar
    photo = models.URLField(default=gravtar_add.format(0))

    def save(self, *args, **kwargs):
        '''method to save object in database'''

        if self.user.id:
            # assigning user id to gravatar id for ratotaing over avatars
            self.photo = gravtar_add.format(self.user.id)
        super().save(*args, **kwargs)

    def __str__(self):
        '''method to return human readable string of an object'''

        return f'{self.user}'


class Team(models.Model):

    name = models.CharField(max_length=150, blank=False, unique=True)
    members = models.ManyToManyField(User, related_name='teams')
    created_by = models.ForeignKey(
        User,
        related_name='created_teams',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def count_members(self):
        return (self.members.count())


class Job(models.Model):
    '''Job section for users'''

    name = models.CharField(max_length=150, blank=False)
    title = models.CharField(max_length=150, blank=False)
    salary = models.IntegerField(default=10000)
    location = models.CharField(max_length=100, blank=False)
    link = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=False)
    created = models.DateTimeField(auto_now_add=True, blank=True)
    role = models.CharField(max_length=200, blank=True)
    indstry = models.CharField(max_length=50, blank=False)
    applied_by = models.ManyToManyField(User, related_name="jobs", blank=True)


class Technologies(models.Model):
    '''
    Job Technologies
    '''
    name = models.CharField(max_length=50)
    job = models.ManyToManyField(Job, related_name='technologies', blank=True)

    def __str__(self):
        ''' str method to return human readable string of an object '''

        return "Name:{}".format(self.name)


class Question(models.Model):

    '''
    Question Model represents the Question data in Database
    '''

    author = models.ForeignKey(User, on_delete=models.CASCADE,
                               blank=False)
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        default=None
    )
    title = models.CharField(max_length=150, blank=False)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    views = models.IntegerField(default=0)
    score = models.IntegerField(default=0)

    def __str__(self):
        ''' str method to return human readable string of an object '''

        return "{}".format(self.title)


class Tag(models.Model):

    '''
    Tag Model represents the tag data in Database
    '''

    name = models.CharField(max_length=30)
    question = models.ManyToManyField(Question, related_name='tags')

    def __str__(self):
        ''' str method to return human readable string of an object '''

        return "Name:{}".format(self.name)


class Answer(models.Model):

    '''
    Answer Model represents the answer data in Database
    '''
    # Choice for approved
    approved_choices = (
        (1, 'Approved'),
        (-1, 'Disapproved')
    )

    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    score = models.IntegerField(default=0)
    approved = models.IntegerField(default=0, choices=approved_choices)
    question = models.ForeignKey(Question, related_name='answers',
                                 on_delete=models.CASCADE)


class Vote(models.Model):
    '''Schema for votes'''

    # choices for vote
    vote_choices = (
        (1, 'Up'),
        (-1, 'Down')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.ForeignKey(
        Answer, on_delete=models.CASCADE,
        related_name='votes', null=True,
        blank=True
    )
    vote = models.IntegerField(default=1, choices=vote_choices)
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE,
        related_name='votes', null=True,
        blank=True
    )

    def __str__(self):
        '''method to return human redable string of object'''

        return f'{self.user}'


class Comment(models.Model):

    '''
    Comment Model represents the Comment data in Database
    '''

    author = models.ForeignKey(User, on_delete=models.CASCADE,
                               null=False, blank=False)
    body = models.TextField(null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE,
                               related_name='comments', null=True,
                               blank=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE,
                                 related_name='comments', null=True,
                                 blank=True)

    def __str__(self):
        '''method to return human redable string of object'''

        return "{}".format(self.author)
