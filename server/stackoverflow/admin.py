from django.contrib import admin
from stackoverflow.models import (Profile, Question, Answer,
                                  Tag, Vote, Comment, Team, Job)
from django.contrib.auth.admin import UserAdmin, Group
from rest_framework.authtoken.models import TokenProxy

# Register your models here.


class TagInline(admin.TabularInline):
    model = Tag.question.through


class AnswerInline(admin.TabularInline):
    model = Answer


class VoteInline(admin.TabularInline):
    model = Vote


class CommentInline(admin.TabularInline):
    model = Comment


# Register your models here.

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('author', 'title', 'score', 'views', 'team')
    list_filter = ('created',)
    search_fields = ('title', 'text')
    inlines = [
        AnswerInline, TagInline, VoteInline, CommentInline
    ]
    readonly_fields = ('score', 'views')


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('author', 'score', 'question', 'approved')
    inlines = [
        VoteInline, CommentInline
    ]
    list_filter = ('created',)
    search_fields = ('text',)
    readonly_fields = ('score',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ('user', 'vote', 'question', 'answer')
    list_filter = ('vote',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'question', 'answer')
    list_filter = ('created',)
    search_fields = ('body',)


class ProfileInline(admin.StackedInline):
    '''Inline profile model fo users'''

    model = Profile


class TokenProxyInline(admin.TabularInline):
    '''Inline Token model for users'''

    model = TokenProxy


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'count_members')
    list_filter = ('name', 'created')
    search_fields = ('name',)


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'title', 'salary', 'location')
    list_filter = ('name', 'salary')
    search_fields = ('name',)


# Initializing inline for user admin
UserAdmin.inlines = [ProfileInline, TokenProxyInline]


# unregister from admin
admin.site.unregister(Group)
admin.site.unregister(TokenProxy)
